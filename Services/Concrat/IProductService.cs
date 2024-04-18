using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.DataTransferObject;
using Entities.Model;

namespace Services.Concrat
{
    public interface IProductService
    {
        IEnumerable<Urunler> GetAllProduct(bool trackchanges);
        Urunler GetOneProductbyId(int id,bool trackchanges);
        Urunler CreateOneProduct(Urunler product);
        void UpdateOneProduct(int id,ProductDtoForUpdate UrunDto,bool trackchanges);
        void DeleteOneProduct(int id,bool trackChanges);


    }
}
