using Microsoft.EntityFrameworkCore;
using Repositories.Concrats;
using Repositories.EFCore;
using Repositories;
using Services.Concrat;
using Services;

using Microsoft.Extensions.DependencyInjection;
using Presentation.ActionFilters;
using Microsoft.Extensions.Options;

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

        public static void ConfigureActionFilters(this IServiceCollection services)
        {
            services.AddScoped<ValidationFilterAttribute>();
            services.AddSingleton<LogFilterAttribute>();

        }
        public static void ConfigureImageFile(this IServiceCollection services) => services.AddTransient<IFileService, FileService>();

        public static void ConfigureCors(this IServiceCollection services)
        {
            
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.WithOrigins("http://localhost:3000", "http://localhost:3000") // Adjust the origin as necessary
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials(); // Add this if you are using cookies or authentication headers
                });
            });

        }
    }
}
