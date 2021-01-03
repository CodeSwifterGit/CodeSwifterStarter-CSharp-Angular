using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using CodeSwifterStarter.Application.Interfaces;

namespace CodeSwifterStarter.Application.Security
{
    public class HasScopeHandler : AuthorizationHandler<HasScopeRequirement>
    {
        private readonly IAuthenticatedUserService _authenticatedUserService;

        public HasScopeHandler(IAuthenticatedUserService authenticatedUserService)
        {
            _authenticatedUserService = authenticatedUserService;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            HasScopeRequirement requirement)
        {
            if (context != null && requirement != null)
            {
                if (_authenticatedUserService.HasScope(requirement.Scope))
                    context?.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
