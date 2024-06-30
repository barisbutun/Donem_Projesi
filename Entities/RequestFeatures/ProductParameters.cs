using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.RequestFeatures
{
    public class ProductParameters:RequestParameters
    {
        public int?  BolgeID { get; set; }
        public uint MinPrice { get; set; }
        public uint MaxPrice { get; set; } = 100000;
        public bool ValidPriceRange => MaxPrice > MinPrice;
        public string? SearchTerm { get; set; }
        public ProductParameters()
        {
            OrderBy = "UrunId";
        }

    }
}
