using System.Linq;

namespace CodeSwifterStarter.Common.Extensions
{
    public static class StringExtensions
    {
        public static string Right(this string str, int length)
        {
            if (string.IsNullOrEmpty(str))
                return str;

            if (str.Length < length)
                str = str.PadLeft(length);

            return str.Substring(str.Length - length - 1, length);
        }

        public static string PascalCase(this string str)
        {
            if (string.IsNullOrEmpty(str))
                return str;

            if (str.ToUpper() == str || str.ToLower() == str)
            {
                return str.ToLower().Replace(" ", "_").Split('_')
                    .Aggregate("",
                        (current, next) =>
                            current + next.Substring(0, 1).ToUpper() + next.Substring(1).ToLower());
            }

            return str.Substring(0, 1).ToUpper() + str.Substring(1);
        }
    }
}
