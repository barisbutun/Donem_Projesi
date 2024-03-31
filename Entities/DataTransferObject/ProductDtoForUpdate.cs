using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObject
{
    public record ProductDtoForUpdate(int UrunId,int BolgeID, string Parca_Adi, string Marka_Adi, int Adet_Sayisi)
    {
        public int UrunId { get; set; }
        public int BolgeID { get; set; }

        public string Parca_Adi { get; set; }

        public string Marka_Adi { get; set; }

        public int Adet_Sayisi { get; set; }




    }
}
