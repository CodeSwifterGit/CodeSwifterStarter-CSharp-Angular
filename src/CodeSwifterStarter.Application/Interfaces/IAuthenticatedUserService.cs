using System;
using System.Collections.Generic;

namespace CodeSwifterStarter.Application.Interfaces
{
    public interface IAuthenticatedUserService
    {
        string Id { get; }
        string Name { get; }
        string Email { get; }
        bool EmailVerified { get; }
        List<string> Scopes { get; }
        string Nickname { get; }
        string Picture { get; }
        DateTime? LastLogin { get; }
        DateTime? LastActivity { get; }
        DateTime? CreatedAt { get; }
        bool IsAuthenticated { get; }

        string BundledUserInfo();
        bool HasScope(string permission);
    }
}