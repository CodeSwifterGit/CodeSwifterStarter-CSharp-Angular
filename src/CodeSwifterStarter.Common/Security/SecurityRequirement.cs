namespace CodeSwifterStarter.Common.Security
{
    public class SecurityRequirement
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public SecurityRequirement()
        {
            
        }

        public SecurityRequirement(string name, string description)
        {
            Name = name;
            Description = description;
        }
    }
}
