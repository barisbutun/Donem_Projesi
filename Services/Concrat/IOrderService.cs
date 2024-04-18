using Entities.DataTransferObject;
using Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Concrat
{
   public interface IOrderService
    {
        IEnumerable<Siparis> GetAllOrder(bool trackChanges);
        Siparis GetOneOrderById(int id, bool trackChanges);
        Siparis CreateOneOrder(Siparis order);
        void UpdateOneOrder(int id, OrderDtoForUpdate orderDto, bool trackChanges);
        void DeleteOneOrder(int id,bool trackChanges);

    }
}
