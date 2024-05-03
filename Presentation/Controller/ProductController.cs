using Entities.DataTransferObject;
using Entities.Exceptions;
using Entities.Model;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Services.Concrat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        [HttpPost]

        public async Task<IActionResult> CreateOneProduct([FromBody] Urunler urunler)
        {

            if(urunler == null)
            {
                return BadRequest();

            }
            _manager.ProductService.CreateOneProduct(urunler);

            return StatusCode(201, urunler);


        }



        [HttpGet]

        public async Task<IActionResult> GetAllProduct()
        {

            var product = _manager.ProductService.GetAllProduct(false);

            return Ok(product);
        }

        [HttpPut("{id:int}")]

        public async Task<IActionResult> UpdateOneProduct([FromRoute(Name="id")] int id, [FromBody] ProductDtoForUpdate productDto)
        {
            if(productDto is null)
            {
                return BadRequest();
            }
            _manager.ProductService.UpdateOneProduct(id, productDto, true);
            return NoContent();


        }
        [HttpGet("{id:int}")]

        public async Task<IActionResult> getOneProduct([FromRoute(Name="id)")] int id)
        {

            var oneProduct = _manager.ProductService.GetOneProductbyId(id, false);

            if(oneProduct is null)
            {
                throw new ProductNotFoundException(id);
            }
            return Ok(oneProduct);
        }
        [HttpDelete("{id:int}")]

        public IActionResult DeleteOneBook([FromRoute(Name="id")] int id)
        {
            _manager.ProductService.DeleteOneProduct(id, false);
            return NoContent();
        
        }

        [HttpPatch("{id:int}")]
        public IActionResult PartiallyUpdateOneProcuct([FromRoute(Name="id")] int id,
            [FromBody] JsonPatchDocument<Urunler> productPatch)
        {
            var entity = _manager.ProductService.GetOneProductbyId(id, true);

            productPatch.ApplyTo(entity);

            _manager.ProductService.UpdateOneProduct(id,new ProductDtoForUpdate(), true);

            return NoContent();



        }




    }
}
