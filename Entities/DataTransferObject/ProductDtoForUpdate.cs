using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObject
{
    public record ProductDtoForUpdate()
    {
        public int UrunId { get; set; }
        public int BolgeID { get; set; }

        public string Parca_Adi { get; set; }

        public int Price { get; set; }  

        public string Marka_Adi { get; set; }

        public int Adet_Sayisi { get; set; }




    }
}
