using Entities.DataTransferObject;
using Entities.Exceptions;
using Entities.Model;
using Entities.RequestFeatures;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using NLog;
using Presentation.ActionFilters;
using Services;
using Services.Concrat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Presentation.Controller
{

    [ApiController]

    [Route("api/product")]

    public class ProductController : ControllerBase
    {
        private readonly IServiceManager _manager;
        private readonly IFileService _fileService;
        public ProductController(IServiceManager manager,IFileService fileService)
        {
            _manager = manager;
            _fileService = fileService;

        }
        [ServiceFilter(typeof(LogFilterAttribute))]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [HttpPost]
        public async Task<IActionResult> CreateOneProductAsync([FromForm] ProductDto productDtoAdd)
        {
            try
            {
                if (productDtoAdd.ImageFile?.Length > 1 * 1024 * 1024)
                {
                    return StatusCode(StatusCodes.Status400BadRequest,
                        "File size should not exceed 1 mb");

                }
                string[] allowedExtensions = { ".jpg", ".jpeg", ".png" };
               
                string CreatedImageName = await _fileService.SaveFileAsync(productDtoAdd.ImageFile, allowedExtensions);
                productDtoAdd.ProductImage = CreatedImageName;

                var product = await _manager.ProductService.CreateOneProductAsync(productDtoAdd);
                return StatusCode(201, product);
            }
            catch (Exception ex)
            {
                
                return StatusCode (StatusCodes.Status500InternalServerError,ex.Message); 
            }

           
        }
        [HttpGet("All_Prodcut")]
        public async Task<IActionResult> GetAllProductAsync1()
        {
            var Product = await _manager.ProductService.GetAllProductAsync1(false);



            return Ok(Product);


        }

        [HttpGet]

        public async Task<IActionResult> GetAllProductAsync([FromQuery] ProductParameters productParameters)
        {

            var PagedResult = await _manager.ProductService.GetAllProductAsync(productParameters, false);

            //Console.WriteLine(PagedResult);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(PagedResult.metaData));

            return Ok(PagedResult.product);
        }
        
        
      

        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOneProductAsync(int id, [FromForm] ProductDtoForUpdate productDtoUpdate)
        {
            try
            {
                if (productDtoUpdate.ImageFile != null)
                {
                    if (productDtoUpdate.ImageFile.Length > 1 * 1024 * 1024)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, "File size should not exceed 1 mb");
                    }

                    string[] allowedExtensions = { ".jpg", ".jpeg", ".png" };
                    string createdImageName = await _fileService.SaveFileAsync(productDtoUpdate.ImageFile, allowedExtensions);

                    productDtoUpdate.ProductImage = createdImageName;
                }

                await _manager.ProductService.UpdateOneProductAsync(id, productDtoUpdate,true);
                return StatusCode(200);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }





        [HttpGet("{id:int}")]

        public async Task<IActionResult> GetOneProductAsync([FromRoute] int id)
        {

            var oneProduct =await  _manager.ProductService.GetOneProductbyIdAsync(id, false);

            if(oneProduct is null)
            {
                throw new ProductNotFoundException(id);
            }
            return Ok(oneProduct);
        }



        [HttpDelete("{id:int}")]

        public async Task<IActionResult> DeleteOneProductAsync([FromRoute(Name="id")] int id)
        {
          await  _manager.ProductService.DeleteOneProductAsync(id, false);
            return NoContent();
        
        }

        [HttpPatch("{id:int}")]
        public async Task<IActionResult> PartiallyUpdateOneProcuctAsync([FromRoute(Name="id")] int id,
            [FromBody] JsonPatchDocument<ProductDtoForUpdate> productPatch)
        {
            if (productPatch is null)
            {
                return BadRequest();

            }

            var result = await _manager.ProductService.GetOneProductForPatchAsync(id, false);



            productPatch.ApplyTo(result.productDtoForUpdate, ModelState); // Yama işlemini uygula

            TryValidateModel(result.productDtoForUpdate);

            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            await _manager.ProductService.SaveChangesForPatchAsync(result.productDtoForUpdate, result.urun);


            return NoContent(); // İçerik yok (204) durumunu döndür



        }
        /* [HttpPut("{id:int}")]

       public async Task<IActionResult> UpdateOneProductAsync([FromRoute(Name="id")] int id,
           [FromForm] ProductDtoForUpdate productDtoUpdate)
       {
           if(productDtoUpdate is null)
           {
               return BadRequest();
           }
           var existingProduct = await
               _manager.ProductService.GetOneProductbyIdAsync(id, true);
           if (existingProduct is null)
           {
               return StatusCode(StatusCodes.Status404NotFound,
                   $"Product with id:{id} does not found");

           }
           string oldImage = existingProduct.ProductImage;
           if(productDtoUpdate != null)
           {
               if (productDtoUpdate.ImageFile?.Length > 1 * 1024 * 1024)
               {
                   return StatusCode(StatusCodes.Status400BadRequest, "File size should " +
                       "not exceed 1 mb");

               }

               string[] allowedFileExtensions = { ".jpg", ".jpeg", ".png" };
               string createdImageName =await _fileService.SaveFileAsync(productDtoUpdate.ImageFile, allowedFileExtensions);
               productDtoUpdate.ProductImage = createdImageName;
           }
           await _manager.ProductService.UpdateOneProductAsync(id, productDtoUpdate, true);
           if (productDtoUpdate != null) {

               _fileService.DeleteFileAsync(oldImage);
           }


           return NoContent();


       }*/




    }
}
