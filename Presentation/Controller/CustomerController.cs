using Entities.DataTransferObject;
using Entities.Exceptions;
using Entities.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.JsonPatch;
using Services.Concrat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Presentation.Controller
{
    [ApiController]

    [Route("api/Customer")]
    public class CustomerController:ControllerBase
    {
        private readonly IServiceManager _manager;

        public CustomerController(IServiceManager manager)
        {

            _manager = manager; 
        }

        [HttpPost] 
        public async Task<IActionResult> CreateOneCustomer([FromBody]  Musteri musteri)
        {

            if(musteri is null)
            {
                return BadRequest();

            }
            _manager.CustomerService.CreateOneCustomer(musteri);
            return StatusCode(201, musteri);


        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomer()
        {
          var Customer = _manager.CustomerService.GetAllCustomer(false);

            return Ok(Customer);


        }

        [HttpPut("{id:int}")]

        public async Task<IActionResult> UpdateOneCustomer([FromRoute(Name="id")] int id, [FromBody] CustomerDtoForUpdate customerDto)
        {

            if(customerDto is null)
            {
                return BadRequest();

            }
            _manager.CustomerService.UpdateOneCustomer(id, customerDto, true);
            return NoContent();


        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetOneCustomer([FromRoute(Name = "id")] int id)
        {



            var  oneCustomer = _manager.CustomerService.GetOneCustomerById(id, false);

            if(oneCustomer is null)
            {

                throw new CustomerNotFoundException(id);


            }

            return Ok(oneCustomer); 

        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteOneCustommer([FromRoute(Name = "id")] int id)
        {
            _manager.CustomerService.DeleteOneCustomer(id, false);
            return NoContent();
        }


        [HttpPatch("{id:int}")]

        public IActionResult PartiallyUpdateOneCustomer([FromRoute(Name="id")]int id,
            [FromBody] JsonPatchDocument<Musteri> customerPatch)
        {
            var entity = _manager.CustomerService.GetOneCustomerById(id, true);

            customerPatch.ApplyTo(entity);
            _manager.CustomerService.UpdateOneCustomer(id,new CustomerDtoForUpdate(),true);

            return NoContent();


        }


    }
}
