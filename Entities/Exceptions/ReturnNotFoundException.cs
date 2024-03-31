using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Exceptions
{
    public class ReturnNotFoundException:NotFoundException
    {
        public ReturnNotFoundException(int id) : base($"no customer return :{id} could not found.")
        {

        }


    }
}
