using Entities.Model;
using Repositories.Concrats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore
{
    public class OrderRepository : RepositoryBase<Siparis>, IOrderRepository
    {
        public OrderRepository(RepositoryContext context) : base(context) { }   

        public void CreateOneOrder(Siparis Order)
        {
            Create(Order);
        }

        public void DeleteOneOrder(Siparis Order)
        {
            Delete(Order);  
        }

        public IQueryable<Siparis> GetAllOrder(bool trackChanges)
        {
            return FindAll(trackChanges)
            .OrderBy(b => b.SiparisID);
        }

        public Siparis GetOneOrderById(int id, bool trackChanges)
        {
            return 
            FindByCondition(b => b.SiparisID.Equals(id), trackChanges).SingleOrDefault();
        }

        public void UpdateOneOrder(Siparis Order)
        {
           Update(Order);
        }
    }
}
