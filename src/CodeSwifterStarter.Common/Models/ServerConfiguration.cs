using System.Collections.Generic;

namespace CodeSwifterStarter.Common.Models
{
    public class ServerConfiguration
    {
        public SecurityProvider SecurityProvider { get; set; }
        public BlobAccount BlobAccount { get; set; }
        public ConnectionStringCollection ConnectionStrings { get; set; }
        public string SessionSand { get; set; }
        public Developer InitialDeveloper { get; set; }
        public List<Developer> OtherTeamMembers { get; set; }
    }
}
