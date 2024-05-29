using Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObject
{
    public class OrderDtoForUpdate
    {


        public int SiparisID { get; set; }
        public int UrunID { get; set; } // Foreign key property
        public Urunler urunler { get; set; }


    }
}
