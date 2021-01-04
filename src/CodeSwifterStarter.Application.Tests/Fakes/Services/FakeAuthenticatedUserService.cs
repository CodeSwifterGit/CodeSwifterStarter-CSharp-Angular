using System;
using System.Collections.Generic;
using CodeSwifterStarter.Application.Interfaces;
using CodeSwifterStarter.Common.Models;
using CodeSwifterStarter.Common.Security;

namespace CodeSwifterStarter.Application.Tests.Fakes.Services
{
    public class FakeAuthenticatedUserService : IAuthenticatedUserService
    {
        public string Id { get; }
        public string Name { get; }
        public string Email { get; }
        public bool EmailVerified { get; }
        public List<string> Permissions { get; }
        public string Nickname { get; }
        public string Picture { get; }
        public DateTime? LastLogin { get; }
        public DateTime? LastActivity { get; }
        public DateTime? CreatedAt { get; }
        public bool IsAuthenticated { get; }

        public FakeAuthenticatedUserService(ServerConfiguration serverConfiguration)
        {
            Id = serverConfiguration.InitialDeveloper.Id;
            Name = serverConfiguration.InitialDeveloper.Name;
            Email = serverConfiguration.InitialDeveloper.Email;
            EmailVerified = true;
            Permissions = new List<string>
            {
                
            };
            IsAuthenticated = true;
        }

        public string BundledUserInfo()
        {
            if (Id == null || Name == null)
                return null;
            return ObfuscatedUser.ToUserInfo(new ObfuscatedUser(Id, Name));
        }

        public bool HasPermission(string permission)
        {
            return true;
        }
    }
}