using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Donem_Projesi.Model;

namespace Donem_Projesi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Eticaret_Sitesi : ControllerBase
    {

        [HttpGet("{id=int)}")]

        public IActionResult UrunAL([FromBody] Urunler urun, [FromRoute(Name ="İd")] int id)
        {

            var entity = urun.UrunId.Where(p =>p.id.Equals(id)).SingleOrDefault;

            if(entity == null)
            {

                return NotFound(new
                {
                    StatusCode = 500,
                    Message = $"ürününüz bulunamadı"


                });

                


            }
            if(id=!entity.Id.Equals(id)) { 
            
                return BadRequest();    

            
            }




        }

        



    }
}
