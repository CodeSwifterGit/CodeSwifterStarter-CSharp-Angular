using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace CodeSwifterStarter.Application.DataEngine.DataEngine
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum SortDirection
    {
        [JsonProperty("ascending")] Ascending,
        [JsonProperty("descending")] Descending
    }
}