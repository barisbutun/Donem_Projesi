using Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Concrats
{
    public interface IReturnRepository : IRepositoryBase<İade>
    {
          IQueryable<İade> GetAllReturn(bool trackChanges);
        İade GetOneReturnById(int id, bool trackChanges);
        void CreateOneReturn(İade Returns);
        void UpdateOneReturn(İade Returns);
        void DeleteOneReturn(İade Returns);


    }
}
