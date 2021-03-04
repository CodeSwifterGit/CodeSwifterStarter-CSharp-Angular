using System.IO;
using System.Reflection;
using CodeSwifterStarter.Common.Helpers;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using Microsoft.Extensions.Hosting;

namespace CodeSwifterStarter.Web.Api.Helpers
{
    public static class ConfigurationHelper<T> where T : class
    {
        public static T GetConfigurationFromJson(IWebHostEnvironment environment)
        {
            var baseFileName = "appsettings.json";
            var environmentRelatedFileName = "";

            if (environment.IsProduction())
            {
                environmentRelatedFileName = "appsettings.Production.json";
            } 
            else if (environment.IsStaging())
            {
                environmentRelatedFileName = "appsettings.UAT.json";
            }
            else
            {
                environmentRelatedFileName = "appsettings.Development.json";
            }

            var codeBase = Assembly.GetExecutingAssembly().Location;
            var path = codeBase.Replace('/', Path.DirectorySeparatorChar);

            var baseFile = Path.Combine(Path.GetDirectoryName(path) ?? "", baseFileName);
            var environmentRelatedFile = Path.Combine(Path.GetDirectoryName(path) ?? "", environmentRelatedFileName);

            var json = File.ReadAllText(baseFile);

            if (File.Exists(environmentRelatedFile))
            {
                json = JsonHelper.MergeJson(json, File.ReadAllText(environmentRelatedFileName));
            }

            return JsonConvert.DeserializeObject<T>(json);
        }
    }
}