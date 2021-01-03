using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CodeSwifterStarter.Common.Extensions
{
    public class EnumExtensions
    {
        public static List<TEnum> GetEnumList<TEnum>() where TEnum : Enum
            => ((TEnum[])Enum.GetValues(typeof(TEnum))).ToList();

        public static bool HasCommonFlag<TEnum>(TEnum value1, TEnum value2) where TEnum : Enum
        {
            var list1 = value1.ToString().Replace(" ", "").Split(',');
            var list2 = value2.ToString().Replace(" ", "").Split(',');

            return list1.Intersect(list2).Any() || list2.Intersect(list1).Any();
        }

        public static bool HasCommonFlag<TEnum>(TEnum? value1, TEnum? value2) where TEnum : struct
        {
            if (value1 == null && value2 == null)
                return true;

            if (value1 == null || value2 == null)
                return false;

            var list1 = value1.ToString().Replace(" ", "").Split(',');
            var list2 = value2.ToString().Replace(" ", "").Split(',');

            return list1.Intersect(list2).Any() || list2.Intersect(list1).Any();
        }

    }
}
