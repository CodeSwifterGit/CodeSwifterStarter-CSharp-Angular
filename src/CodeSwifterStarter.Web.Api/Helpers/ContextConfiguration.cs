using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CodeSwifterStarter.Web.Api.Helpers
{
    public static class ContextConfiguration
    {
        public static IServiceCollection AddDbContext<TContextImplementation>(this IServiceCollection services,
            string connectionString) where TContextImplementation : DbContext
        {
            services.AddDbContext<TContextImplementation>(options =>
                {
                    options.UseSqlServer(connectionString);
                    options.UseLazyLoadingProxies();
                }
            );
            return services;
        }
    }
}
