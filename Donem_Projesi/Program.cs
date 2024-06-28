using Microsoft.EntityFrameworkCore;
using Repositories.EFCore;
using Donem_Projesi.Extensions;
using Newtonsoft.Json;
using NLog;
using Services.Concrat;
using Microsoft.AspNetCore.Mvc;
using Presentation.ActionFilters;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// NLog yapýlandýrmasýný yükle
LogManager.LoadConfiguration(Path.Combine(Directory.GetCurrentDirectory(), "nlog.config"));

builder.Services.AddControllers(config =>
{
    config.RespectBrowserAcceptHeader = true;
})
.AddApplicationPart(typeof(Presentation.AssemblyRefence).Assembly)
.AddNewtonsoftJson(config =>
{
    config.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
});

builder.Services.AddScoped<ValidationFilterAttribute>();

// Add services to the container.
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigureSqlContext(builder.Configuration);
builder.Services.ConfigureRepositoryManager();
builder.Services.ConfigureServiceManager();
builder.Services.ConfigureLoggerService();
builder.Services.ConfigureActionFilters();
builder.Services.ConfigureImageFile();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.ConfigureCors();

var app = builder.Build();

var logger = app.Services.GetRequiredService<ILoggerService>();

app.ConfigureExceptionHandler(logger);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ContentRootPath ve staticFilesPath deðerlerini kontrol etme
Console.WriteLine($"Content Root Path: {builder.Environment.ContentRootPath}");
logger.LogInfo($"Content Root Path: {builder.Environment.ContentRootPath}");

var staticFilesPath = Path.Combine(builder.Environment.ContentRootPath,"..","Proje/myapp/src/Urunler");

Console.WriteLine($"Static Files Path: {staticFilesPath}");
logger.LogInfo($"Static Files Path: {staticFilesPath}");

if (!Directory.Exists(staticFilesPath))
{
    throw new DirectoryNotFoundException($"The directory '{staticFilesPath}' does not exist.");
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(staticFilesPath),
    RequestPath = "/Resources"
});

// CORS middleware should be placed before UseAuthorization
app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
