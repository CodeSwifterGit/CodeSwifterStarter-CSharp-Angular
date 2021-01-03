using System;
using System.Linq;
using Newtonsoft.Json;

namespace CodeSwifterStarter.Common.Converters
{
    public class FlagsEnumJsonConverter : JsonConverter
    {
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var resolvedObjectType = objectType.GenericTypeArguments?.FirstOrDefault() ?? objectType;
            int outVal = 0;
            if (reader.TokenType == JsonToken.StartArray)
            {
                reader.Read();
                while (reader.TokenType != JsonToken.EndArray)
                {
                    outVal += (int)Enum.Parse(resolvedObjectType, reader.Value?.ToString() ?? "");
                    reader.Read();
                }
            }

            // If type is nullable, and there is no value, we return null
            if (objectType != resolvedObjectType && outVal == 0)
                return null;
            
            return Enum.ToObject(resolvedObjectType, outVal);
        }

        public override void WriteJson(JsonWriter writer, Object value, JsonSerializer serializer)
        {
            var flags = value.ToString()
                .Replace("'", "\"")
                .Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries)
                .Select(f => $"\"{f}\"");

            writer.WriteRawValue($"[{string.Join(", ", flags)}]");
        }

        public override bool CanConvert(Type objectType)
        {
            return true;
        }
    }
}