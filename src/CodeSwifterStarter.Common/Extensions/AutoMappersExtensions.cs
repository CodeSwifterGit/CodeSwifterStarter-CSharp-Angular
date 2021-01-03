using System.Reflection;
using AutoMapper;

namespace CodeSwifterStarter.Common.Extensions
{
    public static class AutoMappersExtensions
    {
        public static IMappingExpression<TSource, TDestination> CompensateWithDestinationValues<TSource, TDestination>
            (this IMappingExpression<TSource, TDestination> expression)
        {
            var flags = BindingFlags.Public | BindingFlags.Instance;
            var sourceType = typeof(TSource);
            var destinationProperties = typeof(TDestination).GetProperties(flags);

            foreach (var property in destinationProperties)
            {
                if (sourceType.GetProperty(property.Name, flags) == null)
                {
                    expression.ForMember(property.Name, opt => opt.UseDestinationValue());
                }
            }
            return expression;
        }

        public static IMappingExpression<TSource, TDestination> IgnoreMissingDestinationMembers<TSource, TDestination>
            (this IMappingExpression<TSource, TDestination> expression)
        {
            var flags = BindingFlags.Public | BindingFlags.Instance;
            var destinationType = typeof(TDestination);
            var sourceProperties = typeof(TSource).GetProperties(flags);

            foreach (var property in sourceProperties)
            {
                if (destinationType.GetProperty(property.Name, flags) == null)
                {
                    expression.ForSourceMember(property.Name, opt => opt.DoNotValidate());
                }
            }
            return expression;
        }
    }
}
