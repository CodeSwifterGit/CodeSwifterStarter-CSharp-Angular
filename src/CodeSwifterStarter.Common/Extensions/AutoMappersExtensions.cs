using System.Reflection;
using AutoMapper;

namespace CodeSwifterStarter.Common.Extensions
{
    public static class AutoMappersExtensions
    {
        public static IMappingExpression<TSource, TDestination> CompensateWithDestinationValues<TSource, TDestination>
            (this IMappingExpression<TSource, TDestination> expression)
        {
            var sourceType = typeof(TSource);
            var destinationProperties = typeof(TDestination).GetProperties();

            foreach (var property in destinationProperties)
            {
                if (sourceType.GetProperty(property.Name) == null)
                {
                    expression.ForMember(property.Name, opt => opt.UseDestinationValue());
                }
            }
            return expression;
        }

        public static IMappingExpression<TSource, TDestination> IgnoreMissingDestinationMembers<TSource, TDestination>
            (this IMappingExpression<TSource, TDestination> expression)
        {
            var destinationType = typeof(TDestination);
            var sourceProperties = typeof(TSource).GetProperties();

            foreach (var property in sourceProperties)
            {
                if (destinationType.GetProperty(property.Name) == null)
                {
                    expression.ForSourceMember(property.Name, opt => opt.DoNotValidate());
                }
            }
            return expression;
        }
    }
}
