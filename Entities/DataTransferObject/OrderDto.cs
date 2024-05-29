using Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Entities.DataTransferObject
{
    [XmlRoot("OrderDto")]
    public record class OrderDto
    {

        [XmlElement("Musteri")]
        public Musteri _musteri { get; set; }

        [XmlElement("SiparisID")]
        public int SiparisID { get; set; }

        [XmlElement("Urunler")]
        public Urunler Urunler { get; set; }

    }
}
