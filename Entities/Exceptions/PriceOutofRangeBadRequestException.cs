using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public class PriceOutofRangeBadRequestException:BadRequestException
    {
        public PriceOutofRangeBadRequestException():base("Maximum Price should be less than 100k and greater than 10")
        {
            
        }

    }
}
