using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace CodeSwifterStarter.Common.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum RestrictedRowsScopeEnum
    {
        AllRows,
        OwnerOnly
    }
}
