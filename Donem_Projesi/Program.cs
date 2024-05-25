
using Microsoft.EntityFrameworkCore;
using Repositories.EFCore;
using Donem_Projesi.Extensions;
using Newtonsoft.Json;
using NLog;
using Services.Concrat;


var builder = WebApplication.CreateBuilder(args);

LogManager.LoadConfiguration(Path.Combine(Directory.GetCurrentDirectory(), "nlog.config"));

builder.Services.AddControllers(config =>
{
    config.RespectBrowserAcceptHeader = true;
})
                       .AddApplicationPart(typeof(Presentation.AssemblyRefence).Assembly)
                       .AddNewtonsoftJson();


// Add services to the container.

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.ConfigureSqlContext(builder.Configuration);
builder.Services.ConfigureRepositoryManager();
builder.Services.ConfigureServiceManager();
builder.Services.ConfigureLoggerService();
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
app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();
 
app.Run();
