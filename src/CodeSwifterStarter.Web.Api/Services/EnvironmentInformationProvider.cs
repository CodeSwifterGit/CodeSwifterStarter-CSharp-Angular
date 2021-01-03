using CodeSwifterStarter.Application.Interfaces;
using Microsoft.AspNetCore.Hosting;

namespace CodeSwifterStarter.Web.Api.Services
{
    public class EnvironmentInformationProvider : IEnvironmentInformationProvider
    {
        public string EnvironmentName { get; }
        public string ApplicationName { get; }
        public string ContentRootPath { get; }
        public string WebRootPath { get; }

        public EnvironmentInformationProvider(IWebHostEnvironment environment)
        {
            if (environment != null)
            {
                EnvironmentName = environment.EnvironmentName;
                ApplicationName = environment.ApplicationName;
                ContentRootPath = environment.ContentRootPath;
                WebRootPath = environment.WebRootPath;
            }
        }
    }
}
