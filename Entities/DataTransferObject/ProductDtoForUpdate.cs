using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObject
{
    public record ProductDtoForUpdate()
    {
      
        public int BolgeID { get; set; }
        public int Price { get; set; }
        public string Parca_Adi { get; set; }
        public string Marka_Adi { get; set; }
        public int Adet_Sayisi { get; set; }

        public string? ProductImage { get; set; }
        public IFormFile? ImageFile { get; set; }


    }
}
