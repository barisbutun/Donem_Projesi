using Microsoft.EntityFrameworkCore;
using Repositories.Concrats;
using Repositories.EFCore;
using Repositories;
using Services.Concrat;
using Services;

using Microsoft.Extensions.DependencyInjection;

namespace Donem_Projesi.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<RepositoryContext>(options =>
           options.UseSqlServer(configuration.GetConnectionString("sqlConnection"), b => b.MigrationsAssembly("Donem_Projesi")));
        }

        public static void ConfigureRepositoryManager(this IServiceCollection services) => services.AddScoped<IRepositoryManager, RepositoryManager>();

        public static void ConfigureServiceManager(this IServiceCollection services)
        {
            services.AddScoped<IServiceManager, ServiceManager>();
        }

        public static void ConfigureLoggerService(this IServiceCollection services) => services.AddSingleton<ILoggerService, LoggerManager>();
    }
}
