using Donem_Projesi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObject
{
    public class OrderDtoForUpdate(Musteri _musteri, int SiparisID, int bolgeId)
    {
        

        public int SiparisID { get; set; }
        Musteri musteri { get; set; }

        int bolgeId;



    }
}
