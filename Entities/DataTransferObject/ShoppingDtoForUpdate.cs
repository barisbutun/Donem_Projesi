using Donem_Projesi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObject
{
    public class ShoppingDtoForUpdate(Urunler Urunler, int SepetId, int UrunID,int BolgeId)
    {
        Urunler Urunler { get; set; }
        public int SepetId { get; set; }

        public int UrunID { get; set; }

        public int BolgeId { get; set; }


    }
}
