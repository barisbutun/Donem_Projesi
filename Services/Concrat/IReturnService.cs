using Entities.DataTransferObject;
using Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Concrat
{
    public interface IReturnService
    {
        IEnumerable<İade> GetAllReturn(bool trackChanges);
        İade GetOneReturnById(int id, bool trackChanges);
        İade CreateOneReturn(İade Returns);
        void UpdateOneReturn(int id, ReturnDtoForUpdate returnDto, bool trackChanges);
        void DeleteOneReturn(int id,bool trackChanges);

    }
}
