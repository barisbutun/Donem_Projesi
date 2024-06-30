using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.DataTransferObject;
using Entities.Model;
using Entities.RequestFeatures;
using Microsoft.EntityFrameworkCore;
using Repositories.Concrats;
using Repositories.EFCore.Extensions;

namespace Repositories.EFCore
{
    public sealed class ProductRepository : RepositoryBase<Urunler>, IProductRepository
    {
        public ProductRepository(RepositoryContext context) : base(context)
        {

        }

        public void CreateOneProduct(Urunler Product) => Create(Product);
        public void DeleteOneProduct(Urunler Product)=> Delete(Product);    


        public async Task<PagedList<Urunler>> GetAllProductAsync(ProductParameters productParameters, bool trackChanges)
        {
           
            var query=await FindAll(trackChanges).
            FilterProducts(productParameters.MinPrice, productParameters.MaxPrice)
            .BolgeID(productParameters.BolgeID)
            .Sort(productParameters.OrderBy)
            .Search(productParameters.SearchTerm)    
            .OrderBy(b=>b.UrunID).

            ToListAsync();  


            return PagedList<Urunler>.ToPagedList(query,productParameters.PageNumber,productParameters.PageSize);

            }



        public async Task<Urunler> GetOneProductByIdAsync(int UrunId, bool trackChanges) =>
           await FindByCondition(b => b.UrunID.Equals(UrunId), trackChanges).SingleOrDefaultAsync();

        public void UpdateOneProduct(Urunler Product)=>Update(Product);

        public async Task<IQueryable<Urunler>> GetAllCustomerAsync1(bool trackChanges)
        {
            return FindAll(trackChanges).
                OrderBy(b => b.UrunID);
        }
    }
}
