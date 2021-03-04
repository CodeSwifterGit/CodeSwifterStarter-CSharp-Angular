using Newtonsoft.Json.Linq;

namespace CodeSwifterStarter.Common.Helpers
{
    public static class JsonHelper
    {
        public static string MergeJson(string json1, string json2)
        {
            JObject o1 = JObject.Parse(json1);
            JObject o2 = JObject.Parse(json2);

            o1.Merge(o2, new JsonMergeSettings
            {
                // union array values together to avoid duplicates
                MergeArrayHandling = MergeArrayHandling.Replace
            });

            return o1.ToString(Newtonsoft.Json.Formatting.None);
        }
    }
}
