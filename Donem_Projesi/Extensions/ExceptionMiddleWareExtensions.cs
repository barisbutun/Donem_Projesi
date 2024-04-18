using Entities.ErrorModel;
using Entities.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Services.Concrat;

namespace Donem_Projesi.Extensions
{
    public static class ExceptionMiddleWareExtensions
    {
        public static void ConfigureExceptionHandler(this WebApplication app, ILoggerService logger)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {

                    context.Response.ContentType = "application/json";
                    var contextFeatue = context.Features.Get<IExceptionHandlerFeature>();

                    if (contextFeatue != null)
                    {
                        context.Response.StatusCode = contextFeatue.Error switch
                        {
                            NotFoundException => StatusCodes.Status404NotFound,
                            _ => StatusCodes.Status500InternalServerError

                        };


                        logger.LogError($"Something went wrong:{contextFeatue.Error}");


                        await context.Response.WriteAsync(new ErrorDetails()
                        {
                            StatusCode = context.Response.StatusCode,
                            Message = contextFeatue.Error.Message
                        }
                            .ToString());


                    }

                });






            });
        }



    }
}
