using System;
using System.Collections.Generic;

namespace CodeSwifterStarter.Common.Extensions
{
    public static class CollectionExtension
    {
        public static void ForEach<T>(this ICollection<T> source, Action<T> action)
        {
            foreach (T element in source)
                action(element);
        }
    }
}
