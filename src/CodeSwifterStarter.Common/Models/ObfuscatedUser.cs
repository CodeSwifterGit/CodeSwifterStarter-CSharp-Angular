using CodeSwifterStarter.Common.Extensions;
using Newtonsoft.Json;

namespace CodeSwifterStarter.Common.Models
{
    public class ObfuscatedUser
    {
        public string Id { get; set;  }
        public string Name { get; set; }

        public ObfuscatedUser()
        {
            
        }

        public ObfuscatedUser(string id, string name)
        {
            Id = id;
            Name = name;
        }

        public static ObfuscatedUser FromString(string serialiedUser)
        {
            return JsonConvert.DeserializeObject<ObfuscatedUser>(serialiedUser);
        }

        public static string ToUserInfo(ObfuscatedUser obfuscatedUser)
        {
            return JsonConvert.SerializeObject(obfuscatedUser);
        }

        public static string ToObfuscatedUserInfo(string obfuscatedUserString)
        {
            ObfuscatedUser obfuscatedUser = string.IsNullOrWhiteSpace(obfuscatedUserString)
                ? new ObfuscatedUser()
                : JsonConvert.DeserializeObject<ObfuscatedUser>(obfuscatedUserString);

            return JsonConvert.SerializeObject(new ObfuscatedUser("###" + obfuscatedUser.Id.Right(5), obfuscatedUser.Name));
        }
    }
}
