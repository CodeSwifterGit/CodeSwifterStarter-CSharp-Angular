using System.Collections.Generic;

namespace CodeSwifterStarter.Common.Security
{
    public class SecurityPolicy
    {
        
        public string Name { get; set; }
        public string Description;
        public List<SecurityRequirement> Permissions { get; set; }

        public SecurityPolicy(string name)
        {
            
        }

        public SecurityPolicy(string name, string description, List<SecurityRequirement> permissions)
        {
            Description = description;
            Name = name;
            Permissions = permissions;
        }
    }
}
