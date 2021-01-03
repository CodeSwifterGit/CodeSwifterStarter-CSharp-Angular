using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace CodeSwifterStarter.Application.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum CrudActionEnum
    {
        Create,
        Delete,
        Update
    }
}