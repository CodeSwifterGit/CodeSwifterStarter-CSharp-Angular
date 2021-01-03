using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using CodeSwifterStarter.Application.Interfaces;
using CodeSwifterStarter.Application.Services;
using CodeSwifterStarter.Common.Models;
using CodeSwifterStarter.Domain;
using Microsoft.Extensions.Logging;
using Xunit;

namespace CodeSwifterStarter.Application.Tests.Tests
{
    public class CodeFormattingTests : BaseTest
    {
        private readonly ServerConfiguration _serverConfiguration;
        private readonly ILogger<CodeFormattingTests> _logger;

        public CodeFormattingTests(ICodeSwifterStarterDbContext context, IAuthenticatedUserService authenticatedUserService, 
            ServerConfiguration serverConfiguration, ILogger<CodeFormattingTests> logger) :
            base(context, authenticatedUserService)
        {
            _serverConfiguration = serverConfiguration;
            _logger = logger;
        }
    }
}