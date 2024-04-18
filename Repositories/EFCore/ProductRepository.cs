using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Model;
using Repositories.Concrats;

namespace Repositories.EFCore
{
    public class ProductRepository : RepositoryBase<Urunler>, IProductRepository
    {
        public ProductRepository(RepositoryContext context) : base(context)
        {

        }
        public void CreateOneProduct(Urunler Product)
        {
           Create(Product);
        }

        public void DeleteOneProduct(Urunler Product)
        {
            Delete(Product);    
        }

        public IQueryable<Urunler> GetAllProduct(bool trackChanges)
        {
            return FindAll(trackChanges)
                .OrderBy(b => b.UrunId);
        }

        public Urunler GetOneProductById(int id, bool trackChanges)=>
        FindByCondition(b => b.UrunId.Equals(id), trackChanges).SingleOrDefault();

        public void UpdateOneProduct(Urunler Product)=>Update(Product);
        
    }
}
