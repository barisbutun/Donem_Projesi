using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Entities.DataTransferObject
{
    [XmlRoot("ProductDto")]
    public class ProductDto
    {
        [XmlElement("UrunId")]
        public int UrunId { get; set; }
        [XmlElement("BolgeID")]
        public int BolgeID { get; set; }
        [XmlElement("Parca_Adi")]

        public int Price { get; set; }
        [XmlElement("Price")]

        public string Parca_Adi { get; set; }
        [XmlElement("Marka_Adi")]
        public string Marka_Adi { get; set; }

        [XmlElement("Adet_Sayisi")]
        public int Adet_Sayisi { get; set; }


    }
}
