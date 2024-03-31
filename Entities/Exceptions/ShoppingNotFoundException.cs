using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public class ShoppingNotFoundException:NotFoundException
    {
        public ShoppingNotFoundException(int id) : base($"the shopping with id:{id} could not found.")
        {

        }

    }
}
