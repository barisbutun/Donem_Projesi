using Entities.DataTransferObject;
using Entities.Exceptions;
using Entities.Model;
using Entities.RequestFeatures;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Presentation.ActionFilters;
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

        public ProductController(IServiceManager manager)
        {
            _manager = manager;


        }
        [ServiceFilter(typeof(LogFilterAttribute))]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [HttpPost]
        public async Task<IActionResult> CreateOneProductAsync([FromBody] Urunler urunler)
        {
            if (urunler == null)
            {
                return BadRequest("Product object is null");
            }

            var product = await _manager.ProductService.CreateOneProductAsync(urunler);
            return StatusCode(201, product);
        }



        [HttpGet]

        public async Task<IActionResult> GetAllProductAsync([FromQuery] ProductParameters productParameters)
        {

            var PagedResult = await _manager.ProductService.GetAllProductAsync(productParameters, false);

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(PagedResult.metaData));

            return Ok(PagedResult.product);
        }
        [ServiceFilter(typeof(ValidationFilterAttribute))]

        [HttpPut("{id:int}")]

        public async Task<IActionResult> UpdateOneProductAsync([FromRoute(Name="id")] int id, [FromBody] ProductDtoForUpdate productDto)
        {
            if(productDto is null)
            {
                return BadRequest();
            }
            await _manager.ProductService.UpdateOneProductAsync(id, productDto, true);
            return NoContent();


        }
        [HttpGet("{id:int}")]

        public async Task<IActionResult> getOneProductAsync([FromRoute(Name="id)")] int id)
        {

            var oneProduct = _manager.ProductService.GetOneProductbyIdAsync(id, false);

            if(oneProduct is null)
            {
                throw new ProductNotFoundException(id);
            }
            return Ok(oneProduct);
        }
        [HttpDelete("{id:int}")]

        public IActionResult DeleteOneProductAsync([FromRoute(Name="id")] int id)
        {
            _manager.ProductService.DeleteOneProductAsync(id, false);
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




    }
}
