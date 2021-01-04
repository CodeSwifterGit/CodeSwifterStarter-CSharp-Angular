using AutoMapper;
using MediatR.Pipeline;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Reflection;
using System;
using System.IO.Compression;
using System.Linq;
using CodeSwifterStarter.Application.Extensions;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Joonasw.AspNetCore.SecurityHeaders;
using CodeSwifterStarter.Application.Infrastructure;
using CodeSwifterStarter.Application.Interfaces;
using CodeSwifterStarter.Web.Api.Filters;
using CodeSwifterStarter.Web.Api.Helpers;
using CodeSwifterStarter.Web.Api.Services;
using CodeSwifterStarter.Application.Infrastructure.AutoMapper;
using CodeSwifterStarter.Application.Models;
using CodeSwifterStarter.Domain;
using CodeSwifterStarter.Persistence;
using CodeSwifterStarter.Infrastructure;
using CodeSwifterStarter.Application.Security;
using CodeSwifterStarter.Infrastructure.Services;
using CodeSwifterStarter.Application.Services;
using CodeSwifterStarter.Common.Models;
using CodeSwifterStarter.Common.Security;
using CodeSwifterStarter.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CodeSwifterStarter.Web.Api
{
    public class Startup
    {
        private IWebHostEnvironment Environment { get; }
        private IConfiguration Configuration { get; }
        private ServerConfiguration _serverConfiguration;
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            Environment = env;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add Singletons
            services.AddSingleton<IEnvironmentInformationProvider>(new EnvironmentInformationProvider(Environment));

            // Ensure nothing non-secure passes to any controller
            if (!Environment.IsDevelopment() && !Environment.EnvironmentName.Equals("Local", StringComparison.InvariantCultureIgnoreCase))
            {
                services.Configure<MvcOptions>(o => o.Filters.Add(new RequireHttpsAttribute()));

                // TODO: We need to register codeswifterstarter.com to the list of hsts preloaded domains https://hstspreload.org/
                services.AddHsts(o =>
                {
                    o.MaxAge = TimeSpan.FromDays(365);
                    o.Preload = true;
                    o.IncludeSubDomains = true;
                });
            }

            services.AddHttpContextAccessor();
            services.AddScoped<Microsoft.AspNetCore.Http.HttpContextAccessor>();

            _serverConfiguration = ConfigurationHelper<ServerConfiguration>.GetConfigurationFromJson(Environment);

            services.AddSingleton(_serverConfiguration);

            // Add AutoMapper
            services.AddSingleton<IMapper>(new Mapper(new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AutoMapperProfile>();
            })));

            // Add framework services.
            services.AddTransient<INotificationService, NotificationService>();
            services.AddTransient<IFileStorageService, FileStorageService>();
            services.AddTransient<ICrudWarningService, CrudWarningService>();
            services.AddTransient<IDateTime, MachineDateTime>();
            
            //TODO: Uncomment, once ready
            //services.AddScoped<AuthorizationService>();

            // Register AuthenticatedUserService service
            services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();

            // Register all query managers
            services.AddScopedForClassesEndingWith(typeof(AutoMapperProfile).GetTypeInfo().Assembly, "QueryManager");

            // Add MediatR
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPreProcessorBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPerformanceBehaviour<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));
            services.AddMediatR(new[]
            {
                typeof(AutoMapperProfile).GetTypeInfo().Assembly
            });

            // Add database context
            services.AddDbContext<CodeSwifterStarterDbContext>(_serverConfiguration.ConnectionStrings.CodeSwifterStarterDatabase);
            services.AddScoped(service => (ICodeSwifterStarterDbContext)service.GetService(typeof(CodeSwifterStarterDbContext)));

            // Add seeder
            services.AddScoped<CodeSwifterStarterSeeder>();

            // Add support for proper validation return messages
            services
              .AddMvc(options => options.Filters.Add(typeof(CustomExceptionFilterAttribute)))
              .AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
              .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<AutoMapperProfile>());

            services.AddDataProtection(o => { o.ApplicationDiscriminator = "CodeSwifterStarter"; });

            services.Configure<BrotliCompressionProviderOptions>
                (options => options.Level = CompressionLevel.Fastest);

            services.Configure<GzipCompressionProviderOptions>
                (options => options.Level = CompressionLevel.Fastest);

            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.Providers.Add<BrotliCompressionProvider>();
                options.Providers.Add<GzipCompressionProvider>();
                options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[]
                    {"image/svg+xml", "image/jpeg", "image/png", "text/html", "application/javascript", "application/json", "text/json", "text/css"});
            });

            services.AddControllersWithViews();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services
                .AddMvc(options => { options.Filters.Add(typeof(CustomExceptionFilterAttribute)); })
                .AddNewtonsoftJson()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);


            //Add authentication services
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => Environment.IsProduction();
                options.MinimumSameSitePolicy = Microsoft.AspNetCore.Http.SameSiteMode.None;
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Authority = _serverConfiguration.SecurityProvider.Authority;
                options.Audience = _serverConfiguration.SecurityProvider.SingleSignOn.Audience;
            });

            var authDomain = _serverConfiguration.SecurityProvider.Authority;

            services.AddAuthorization(options =>
            {
                foreach (var securityPolicy in SecurityPoliciesFactory.Policies)
                {
                    options.AddPolicy(securityPolicy.Name,
                        policy =>
                        {
                            foreach (var permission in securityPolicy.Permissions)
                            {
                                policy.Requirements.Add(new PermissionRequirement(permission.Name, authDomain));
                            }
                        });
                }
            });

            // register the scope authorization handler
            services.AddScoped<IAuthorizationHandler, PermissionHandler>();

            // Consider making this publicly available
            if (Environment.IsDevelopment())
                services.AddSwaggerDocument();

            // Customise default API behavour
            services.Configure<ApiBehaviorOptions>(options =>
            {
                if (Environment.IsProduction())
                    options.SuppressModelStateInvalidFilter = true;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (Environment.IsDevelopment() || Environment.EnvironmentName.Equals("Local", StringComparison.InvariantCultureIgnoreCase))
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                HstsBuilderExtensions.UseHsts(app);
                app.UseHttpsRedirection();
            }

            // Hacker prevention
            app.UseCsp(csp =>
                {
                    if (Environment.IsDevelopment() || Environment.EnvironmentName.Equals("Local", StringComparison.InvariantCultureIgnoreCase))
                    {
                        csp.AllowScripts
                            .FromSelf()
                            .From("http://localhost:4200")
                            .From("https://localhost:6000")
                            .AllowUnsafeInline()
                            .AllowUnsafeEval();
                        csp.AllowStyles
                            .FromSelf()
                            .From("http://localhost:4200")
                            .From("https://localhost:6000")
                            .From("https://fonts.googleapis.com")
                            .AllowUnsafeInline();
                        csp.AllowImages
                            .FromSelf()
                            .From("http://localhost:4200")
                            .From("https://localhost:6000");
                        csp.AllowFonts.FromAnywhere();
                        
                    }
                    else
                    {
                        csp.AllowScripts
                            .FromSelf()
                            .AllowUnsafeInline()
                            .AllowUnsafeEval();
                        csp.AllowStyles
                            .FromSelf()
                            .From("https://fonts.googleapis.com")
                            .From("https://unpkg.com/monaco-editor")
                            .AllowUnsafeInline();
                        csp.AllowImages
                            .FromSelf();
                        csp.AllowFonts
                            .FromAnywhere();
                    }
                })
                .UseXFrameOptions(new XFrameOptionsOptions(XFrameOptionsOptions.XFrameOptionsValues.Deny))
                .UseReferrerPolicy(new ReferrerPolicyOptions(ReferrerPolicyOptions.ReferrerPolicyValue.NoReferrer))
                .UseXXssProtection(new XXssProtectionOptions(true, true))
                .UseXContentTypeOptions(new XContentTypeOptionsOptions(false));

            app.UseResponseCompression();
            app.UseStaticFiles();
            if (!Environment.IsDevelopment() && !Environment.EnvironmentName.Equals("Local", StringComparison.InvariantCultureIgnoreCase))
            {
                app.UseSpaStaticFiles();
            }

            if (Environment.EnvironmentName.Equals("Local", StringComparison.InvariantCultureIgnoreCase))
            {
                app.UseCors(c => c.WithOrigins("http://localhost:4200", "https://localhost:6000", "http://localhost:6001"));
            }

            app.UseOpenApi();

            // Consider making this publicly available
            if (Environment.IsDevelopment())
                app.UseSwaggerUi3();

            if (Environment.IsDevelopment())
                Console.WriteLine("Environment: " + Environment.EnvironmentName);

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(config =>
            {
                config.MapControllerRoute(
                    name: "api",
                    pattern: "api/[controller]/{action}/{id?}");

                config.MapControllerRoute(
                    name: "auth",
                    pattern: "auth/[controller]/{action}/{id?}");
            });

            if (!Environment.IsEnvironment("Local"))
                app.UseSpa(spa => { spa.Options.SourcePath = "ClientApp"; });
        }
    }
}
