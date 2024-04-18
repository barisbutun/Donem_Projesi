using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repositories.Concrats;
using Repositories.EFCore;
using Entities.Model;
using System.Linq.Expressions;
namespace Repositories
{
    public class ReturnRepository : RepositoryBase<İade>, IReturnRepository
    {
        public ReturnRepository(RepositoryContext context):base(context) { }


        public void CreateOneReturn(İade Returns)
        {
            Create(Returns);
        }

        public void DeleteOneReturn(İade Returns)
        {
            Delete(Returns);
        }

        public IQueryable<İade> GetAllReturn(bool trackChanges)
        {
            return FindAll(trackChanges)
                .OrderBy(b => b.BolgeID_iade);
        }

        public İade GetOneReturnById(int id, bool trackChanges) =>
            FindByCondition(b => b.BolgeID_iade.Equals(id), trackChanges).SingleOrDefault();

        public void UpdateOneReturn(İade Returns)
        {
            Update(Returns);
        }
    }
}
