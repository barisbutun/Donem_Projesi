using Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Concrats
{
    public interface IOrderRepository:IRepositoryBase<Siparis>
    {

        IQueryable<Siparis> GetAllOrder(bool trackChanges);
        Siparis GetOneOrderById(int id, bool trackChanges);

        void CreateOneOrder(Siparis Order);
        void UpdateOneOrder(Siparis Order);
        void DeleteOneOrder(Siparis Order);


    }
}
