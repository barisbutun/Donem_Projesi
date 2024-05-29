using Entities.Model;
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
    [Route("api/Shopping")]

    public class ShoppingController:ControllerBase
    {
        private readonly IServiceManager _manager;
    
   
    public ShoppingController(IServiceManager manager)
        {
            _manager = manager;
        }
        [HttpPost("{id:int}")]

        public async Task<IActionResult> CreateOneShopping([FromBody] Sepet sepet, [FromRoute(Name ="id")] int id)
        {




            if(sepet is null)
            {
                return BadRequest();

            }
            var product = await _manager.ProductService.GetOneProductbyIdAsync(id, false);
            if(product is null)
            {
                return NotFound();

            }
           var CreateShopping= _manager.ShoppingService.CreateOneShopping(sepet);
            var ResponseData = new
            {
                Product = product,
                Shopping = CreateShopping

            };


            return StatusCode(201,ResponseData);

        }



        [HttpGet]
        public async Task<IActionResult> GetAllShopping()
        {

            var Shopping = _manager.OrderService.GetAllOrder(false);
            
            return Ok(Shopping);    
        }

        [HttpDelete("{id:int}")]

        public async Task<IActionResult> DeleteOneShopping([FromRoute(Name ="id")] int id)
        {
            _manager.ShoppingService.DeleteOneShopping(id, false);
            return NoContent();
        }

    }
}
