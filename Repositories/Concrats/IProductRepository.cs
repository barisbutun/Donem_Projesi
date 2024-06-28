using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.DataTransferObject;
using Entities.Model;
using Entities.RequestFeatures;

namespace Repositories.Concrats
{
    public interface IProductRepository:IRepositoryBase<Urunler>
    {
        Task<PagedList<Urunler>> GetAllProductAsync(ProductParameters productParameters,bool trackChanges);
        Task<Urunler> GetOneProductByIdAsync(int id, bool trackChanges);
        Task<IQueryable<Urunler>> GetAllCustomerAsync1(bool trackChanges);
        void CreateOneProduct(Urunler Product);
        void UpdateOneProduct(Urunler Product);
        void DeleteOneProduct(Urunler Product);
        
    }
}
