using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public class CustomerNotFoundException:NotFoundException
    {

        public CustomerNotFoundException(int id) : base($"the Customer with id:{id} could not found.")
        {

        }
    }
}
