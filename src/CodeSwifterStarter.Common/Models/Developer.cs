namespace CodeSwifterStarter.Common.Models
{
    public class Developer
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Nickname { get; set; }
        public string Email { get; set; }

        private string id { get; set; }
        private string name { get; set; }
        private string obfuscatedUserInfo { get; set; }

        public string ObfuscatedUserInfo()
        {
            if (id != null && id == Id && name != null && name == Name)
                return obfuscatedUserInfo;

            obfuscatedUserInfo = ObfuscatedUser.ToUserInfo(new ObfuscatedUser(Id, Name));
            name = Name;
            id = Id;

            return obfuscatedUserInfo;
        }
    }
}
