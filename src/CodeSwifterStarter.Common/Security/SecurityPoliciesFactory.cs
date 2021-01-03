using System.Collections.Generic;
using System.Linq;

namespace CodeSwifterStarter.Common.Security
{
    public static class SecurityPoliciesFactory
    {
        private static List<SecurityPolicy> _policies;

        public static List<SecurityPolicy> Policies => _policies ??= new List<SecurityPolicy>{};
    }
}
