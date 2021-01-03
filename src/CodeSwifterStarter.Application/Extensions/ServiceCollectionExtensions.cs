using System;
using System.Linq;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace CodeSwifterStarter.Application.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddScopedForClassesEndingWith(this IServiceCollection services,
            Assembly assembly, string endsWith)
        {
            assembly?.GetTypes().Where(t => t.Name.EndsWith(endsWith, StringComparison.InvariantCulture)).ToList()
                .ForEach(
                    type =>
                    {
                        services.AddScoped(type);
                    });

            return services;
        }

        public static IServiceCollection AddTransientForClassesEndingWith(this IServiceCollection services,
            Assembly assembly, string endsWith)
        {
            assembly?.GetTypes().Where(t => t.Name.EndsWith(endsWith, StringComparison.InvariantCulture)).ToList()
                .ForEach(
                    type =>
                    {
                        services.AddTransient(type);
                    });

            return services;
        }

        public static IServiceCollection AddSingletonForClassesEndingWith(this IServiceCollection services,
            Assembly assembly, string endsWith)
        {
            assembly?.GetTypes().Where(t => t.Name.EndsWith(endsWith, StringComparison.InvariantCulture)).ToList()
                .ForEach(
                    type =>
                    {
                        services.AddSingleton(type);
                    });

            return services;
        }

        public static IServiceCollection AddScopedForClassesInheritingFrom(this IServiceCollection services,
            Assembly assembly, Type fromType)
        {
            if (fromType == null || assembly == null) return services;

            assembly.GetTypes().Where(t => fromType.IsAssignableFrom(t) && !t.IsInterface).ToList()
                .ForEach(
                    type =>
                    {
                        services.AddScoped(fromType, type);
                    });

            return services;
        }

        public static IServiceCollection AddSingletonForClassesInheritingFrom(this IServiceCollection services,
            Assembly assembly, Type fromType)
        {
            if (fromType == null || assembly == null) return services;

            assembly.GetTypes().Where(t => fromType.IsAssignableFrom(t) && !t.IsInterface).ToList()
                .ForEach(
                    type =>
                    {
                        services.AddSingleton(fromType, type);
                    });

            return services;
        }
    }
}