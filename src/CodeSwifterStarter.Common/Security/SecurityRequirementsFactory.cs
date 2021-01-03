using System.Collections.Generic;

namespace CodeSwifterStarter.Common.Security
{
    public static class SecurityRequirementsFactory
    {
        private static List<SecurityRequirement> _permissions;

        public static List<SecurityRequirement> Permissions =>
            _permissions ??= new List<SecurityRequirement>
            {
            };
    }
}