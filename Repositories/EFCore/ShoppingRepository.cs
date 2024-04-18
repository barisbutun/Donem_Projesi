using Entities.Model;
using Repositories.Concrats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore
{
    public class ShoppingRepository : RepositoryBase<Sepet>, IShoppingRepository
    {

        public ShoppingRepository(RepositoryContext context):base(context) { }

        public void CreateOneShopping(Sepet Shopping)
        {
            Create(Shopping);
        }

        public void DeleteOneShopping(Sepet Shopping)
        {
            Delete(Shopping);
        }

        public IQueryable<Sepet> GetAllShopping(bool trackChanges)
        {
            return FindAll(trackChanges).OrderBy(b=>b.SepetId);
        }

        public Sepet GetOneShppingById(int id, bool trackChanges)
        {
            return FindByCondition(b => b.SepetId.Equals(id), trackChanges).SingleOrDefault();
        }

        public void UpdateOneShopping(Sepet Shopping)
        {
          Update(Shopping); 
        }
    }
}
