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

    [Route("api/Order")]

    public class OrderController:ControllerBase
    {
        private readonly IServiceManager _manager;

        public OrderController(IServiceManager manager)
        {
            _manager = manager;
            
        }

        [HttpPost("{id:int}")]
        public  IActionResult CreateOneOrder([FromRoute] int id, [FromBody] Siparis siparis)
        {
            if (siparis == null)
            {
                return BadRequest();
            }

            var customer =  _manager.CustomerService.GetOneCustomerByIdAsync(id, false);
            if (customer == null)
            {
                return NotFound(); // Belirtilen müşteri bulunamadı durumu için 404 dönüşü yapabilirsiniz.
            }

            var createdOrder = _manager.OrderService.CreateOneOrder(siparis);

            // Müşteri ve sipariş verilerini birlikte döndürmek için bir model oluşturabilirsiniz.
            var responseData = new
            {
                Customer = customer,
                Order = createdOrder
            };

            return StatusCode(201,responseData); // İşlem başarılı olduğunda 200 kodu ve veriler dönülecek.
        }
        [HttpGet]
        public async Task<IActionResult> GetAllOrder()
        {

            var Order = _manager.OrderService.GetAllOrder(false);
        
        return Ok(Order);
        }
        [HttpDelete("{id:int}")]
        public IActionResult DeleteOneOrder([FromRoute(Name="id")] int id)
        {
            _manager.OrderService.DeleteOneOrder(id, false);
            return NoContent();


        }


    }
}
