using System;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using Microsoft.Extensions.Hosting;

namespace CodeSwifterStarter.Web.Api.Helpers
{
    public static class ConfigurationHelper<T> where T : class
    {
        public static T GetConfigurationFromJson(IWebHostEnvironment environment)
        {
            var fileName = "appsettings.json";

            if (environment.IsProduction())
                fileName = "appsettings.Production.json";

            if (environment.IsStaging())
                fileName = "appsettings.UAT.json";

            if (environment.IsDevelopment())
                fileName = "appsettings.Development.json";

            var codeBase = Assembly.GetExecutingAssembly().Location;
            var uri = new UriBuilder(codeBase);
            var path = Uri.UnescapeDataString(uri.Path);

            var file = Path.Combine(Path.GetDirectoryName(path), fileName);

            return JsonConvert.DeserializeObject<T>(File.ReadAllText(file));
        }
    }
}