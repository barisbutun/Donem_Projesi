using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Model;

namespace Repositories.Concrats
{
    public interface IProductRepository:IRepositoryBase<Urunler>
    {
        IQueryable<Urunler> GetAllProduct(bool trackChanges);
        Urunler GetOneProductById(int id, bool trackChanges);

        void CreateOneProduct(Urunler Product);
        void UpdateOneProduct(Urunler Product);
        void DeleteOneProduct(Urunler Product);

    }
}
