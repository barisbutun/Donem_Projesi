using Entities.DataTransferObject;
using Entities.Model;
using Microsoft.AspNetCore.Mvc.Formatters;
using System.Collections;
using Microsoft.Net.Http.Headers;
using System.Text;


namespace Donem_Projesi.Utilities.Formatters
{
    public class CsvOutputFormatter:TextOutputFormatter
    {
        public CsvOutputFormatter()
        {
            SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse("text/csv"));
            SupportedEncodings.Add(Encoding.UTF8);
            SupportedEncodings.Add(Encoding.Unicode);

        }


        protected override bool CanWriteType(Type? type)
        {

            if (typeof(CustomerDto).IsAssignableFrom(type) || typeof(IEnumerable<CustomerDto>).IsAssignableFrom(type)
                )
            {
                return base.CanWriteType(type);
            }
            if (typeof(ProductDto).IsAssignableFrom(type) || typeof(IEnumerable<ProductDto>).IsAssignableFrom(type)
               )
            {
                return base.CanWriteType(type);
            }



            return false;
        }
        private static void FormatCsv(StringBuilder buffer, CustomerDto customer)
        {
            buffer.AppendLine($"{customer.Id},{customer.Ad},{customer.Email}");

        }
        private static void FormatCsv1(StringBuilder buffer, ProductDto product)
        {
            buffer.AppendLine($"{product.UrunId},{product.Parca_Adi},{product.BolgeID}");

        }


        public override async Task WriteResponseBodyAsync(OutputFormatterWriteContext context,Encoding selectedEncoding)
        {
            var response=context.HttpContext.Response;
            var buffer  =new StringBuilder();
            if(context.Object is IEnumerable<CustomerDto>){
            
                foreach(var customer in (IEnumerable<CustomerDto>)context.Object)
                {
                    FormatCsv(buffer,customer);

                }

            }
            else
            {
                FormatCsv(buffer,(CustomerDto)context.Object);  
            }
            if (context.Object is IEnumerable<ProductDto>)
            {

                foreach (var product in (IEnumerable<ProductDto>)context.Object)
                {
                    FormatCsv1(buffer, product);

                }

            }
            else
            {
                FormatCsv1(buffer, (ProductDto)context.Object);
            }


            await response.WriteAsync(buffer.ToString());   


        }
    }
}
