using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.DataTransferObject;
using Entities.Model;
using Entities.RequestFeatures;

namespace Services.Concrat
{
    public interface IProductService
    {
        Task<(IEnumerable<ProductDto> product, MetaData metaData)> GetAllProductAsync(ProductParameters productParameters, bool trackchanges);
        Task<ProductDto> GetOneProductbyIdAsync(int id, bool trackchanges);
        Task<ProductDto> CreateOneProductAsync(Urunler product);


        Task UpdateOneProductAsync(int id, ProductDtoForUpdate productDto, bool trackchanges);
        Task DeleteOneProductAsync(int id, bool trackChanges);

        Task<(ProductDtoForUpdate productDtoForUpdate,Urunler urun)> GetOneProductForPatchAsync(int id, bool trackChanges);


        Task SaveChangesForPatchAsync(ProductDtoForUpdate productDtoForUpdate,Urunler urun);

    }
}
