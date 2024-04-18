using Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Concrats
{
    public interface IShoppingRepository:IRepositoryBase<Sepet>
    {
        IQueryable<Sepet> GetAllShopping(bool trackChanges);
        Sepet GetOneShppingById(int id, bool trackChanges);

        void CreateOneShopping(Sepet Shopping);
        void UpdateOneShopping(Sepet Shopping);
        void DeleteOneShopping(Sepet Shopping);

    }
}
