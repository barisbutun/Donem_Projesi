using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Entities.DataTransferObject
{
    [XmlRoot("CustomerDto")]

    public record class CustomerDto
      {
        [XmlElement("Id")]
        public int Id { get; set; }
        [XmlElement("Ad")]
        public string Ad { get; set; }
        [XmlElement("Soyad")]

        public string Soyad { get; set; }
        [XmlElement("Phone")]
        public int Phone { get; set; }
        [XmlElement("sifre")]
        public string sifre { get; set; }

        [XmlElement("Email")]

        public string Email { get; set; }

    }
}
