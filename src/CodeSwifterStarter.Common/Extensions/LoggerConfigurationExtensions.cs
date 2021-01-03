using System;
using Serilog;
using Serilog.Formatting.Compact;

namespace CodeSwifterStarter.Common.Extensions
{
    public static class LoggerConfigurationExtensions
    {
        private const string AspNetCoreEnvironmentName = "DOTNET_ENVIRONMENT";
        private const string Local = null;
        private const string Development = null;
        private const string UAT = null;
        private const string Production = null;
        private const string DockerSeqInstance = "http://localhost:5341";
        private const string LiveSeqInstance = "http://seq.codeswifterstarter.com:5341";

        public static LoggerConfiguration WriteForEnvironment(this LoggerConfiguration configuration)
        {
            switch (Environment.GetEnvironmentVariable(AspNetCoreEnvironmentName))
            {
                case nameof(Local):
                    // Run docker command to make this working
                    // docker run --rm -it -e ACCEPT_EULA=Y -p 5341:80 datalust/seq
                    configuration = configuration
                        .WriteTo.Console(new RenderedCompactJsonFormatter())
                        .WriteTo.Seq(DockerSeqInstance);
                    break;
                case nameof(Development):
                case nameof(UAT):
                case nameof(Production):
                    configuration = configuration.WriteTo.Seq(LiveSeqInstance);
                    break;
            }

            return configuration;
        }
    }
}
