using CodeSwifterStarter.Application.Interfaces;
using CodeSwifterStarter.Domain;

namespace CodeSwifterStarter.Application.Tests
{
    public abstract class BaseTest
    {
        private readonly ICodeSwifterStarterDbContext _context;
        private readonly IAuthenticatedUserService _authenticatedUserService;

        protected BaseTest(ICodeSwifterStarterDbContext context, IAuthenticatedUserService authenticatedUserService)
        {
            _context = context;
            _authenticatedUserService = authenticatedUserService;
        }
    }
}