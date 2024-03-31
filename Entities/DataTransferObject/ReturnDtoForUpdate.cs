using Donem_Projesi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObject
{
    public class ReturnDtoForUpdate(Urunler urun_iade, Siparis Siparis_iade, int UrunId_iade, int BolgeID_iade, int siparis_iade)
    {
        public Urunler urun_iade { get; set; }
        public Siparis Siparis_iade { get; set; }

        public int UrunId_iade { get; set; }
        public int BolgeID_iade { get; set; }

        public int siparis_iade { get; set; }



        public int iade_id { get; set; }

    }
}
