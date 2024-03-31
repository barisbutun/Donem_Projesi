using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public class OrderNotFoundException:NotFoundException
    {
        public OrderNotFoundException(int id) : base($"the Order with id:{id} could not found.")
        {

        }

    }
}
