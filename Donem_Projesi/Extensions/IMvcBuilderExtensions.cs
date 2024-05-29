using Donem_Projesi.Utilities.Formatters;

namespace Donem_Projesi.Extensions
{
    public static class IMvcBuilderExtensions
    {
        public static IMvcBuilder AddCustomCsvFormatter(this IMvcBuilder builder) =>
            builder.AddMvcOptions(config => config.OutputFormatters
            .Add(new CsvOutputFormatter()));
    }
}
