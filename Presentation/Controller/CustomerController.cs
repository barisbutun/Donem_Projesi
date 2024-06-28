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
using Presentation.ActionFilters;
using System.ComponentModel.DataAnnotations;

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
        [ServiceFilter(typeof(LogFilterAttribute))]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [HttpPost] 
        public async Task<IActionResult> CreateOneCustomer([FromBody]  Musteri musteri)
        {
            /*if(musteri is null)
            {
                return BadRequest();
            }*/
            /*if(!ModelState.IsValid)
               return UnprocessableEntity(ModelState); Eylem filtrelerinde attribute sayesinde tekrarlı kodları yazmamıza gerek yok
              */
           if(musteri == null) {

                return BadRequest();
            }
          var customer=await _manager.CustomerService.CreateOneCustomerAsync(musteri);

            return StatusCode(201, customer);

        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomer()
        {
          var Customer =  await _manager.CustomerService.GetAllCustomerAsync(false);



            return Ok(Customer);


        }

        [HttpPut("{id:int}")]

        public async Task<IActionResult> UpdateOneCustomer([FromRoute(Name="id")] int id, [FromBody] CustomerDtoForUpdate customerDto)
        {
 
            if(customerDto is null)
            {
                return BadRequest();

            }
           await _manager.CustomerService.UpdateOneCustomerAsync(id, customerDto, true);
            return NoContent();
            

        }

        [HttpGet("Authenticate")]
        public async Task<IActionResult> Authentication([FromQuery] string Email, [FromQuery] string Password)
        {
            if (string.IsNullOrEmpty(Email) || string.IsNullOrEmpty(Password))
            {
                return BadRequest("Email or password cannot be empty");
            }

            var Customer = await _manager.CustomerService.GetAllCustomerAsync(false);

            var authenticatedCustomer = Customer.FirstOrDefault(x => x.Email == Email && x.sifre == Password);

            if (authenticatedCustomer != null)
            {
                // Doğrulama başarılı, istemciye müşteri bilgilerini döndür.
                return Ok(authenticatedCustomer);
            }

            // Eğer hiçbir müşteri bulunamazsa veya doğrulama başarısızsa NotFound döndür.
            return NotFound("Customer not found or authentication failed");
        }









        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetOneCustomer([FromRoute(Name = "id")] int id)
        {
            var  oneCustomer =await _manager.CustomerService.GetOneCustomerByIdAsync(id, false);

            if(oneCustomer is null)
            {

                throw new CustomerNotFoundException(id);


            }

            return Ok(oneCustomer); 

        }

        [HttpDelete("{id:int}")]
        public async Task DeleteOneCustomerAsync(int id, bool trackChanges)
        {
            var entity = await _manager.CustomerService.GetOneCustomerByIdAsync(id, trackChanges);

            if (entity == null)
            {
                // Müşteri bulunamadı, işlemi iptal et veya istisna fırlat
                throw new Exception("Customer not found");
            }

           await  _manager.CustomerService.DeleteOneCustomerAsync(id,false);
            NoContent();

        }

        [HttpPatch("{id:int}")]

        public async Task<IActionResult> PartiallyUpdateOneCustomer([FromRoute(Name="id")]int id,
            [FromBody] JsonPatchDocument<CustomerDtoForUpdate> customerPatch)
        {

            if(customerPatch is null)
            {

                return BadRequest();    
            }
            var result = await _manager.CustomerService.GetOneCustomerForPatchAsync(id, false);

            customerPatch.ApplyTo(result.CustomerDtoForUpdate, ModelState);

            TryValidateModel(result.CustomerDtoForUpdate);

            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            await _manager.CustomerService.SaveChangesForPatchAsync(result.CustomerDtoForUpdate, result.musteri);



            return NoContent(); // İçerik yok (204) durumunu döndür

        }


    }
}
