using AutoMapper;
using Entities.DataTransferObject;
using Entities.Exceptions;
using Entities.Model;
using Entities.RequestFeatures;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Repositories.Concrats;
using Services.Concrat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ProductManager : IProductService
    {
        private readonly IRepositoryManager _manager;
        private readonly ILoggerService _logger;
        private readonly IMapper _mapper;
        
        public ProductManager(IRepositoryManager manager, ILoggerService logger, IMapper mapper)
        {
            _manager = manager;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<ProductDto> CreateOneProductAsync(ProductDto product)
        {
            var urunler=_mapper.Map<Urunler>(product);

            _manager.Urunler.CreateOneProduct(urunler);
            await _manager.SaveAsync();
            
            return _mapper.Map<ProductDto>(urunler);
          
        }

        public async Task DeleteOneProductAsync(int id, bool trackChanges)
        {
            var entity = await GetOneProductByIdAndCheckExist(id, trackChanges);

            _manager.Urunler.DeleteOneProduct(entity);
            await _manager.SaveAsync();
        }

        public async Task<(IEnumerable<ProductDto> product, MetaData metaData)> GetAllProductAsync(ProductParameters productParameters, bool trackChanges)
        {
            if (!productParameters.ValidPriceRange)
            {

                throw new PriceOutofRangeBadRequestException();
            }

            var productWithMetaData = await _manager.Urunler.GetAllProductAsync(productParameters, trackChanges);
            var productDto =  _mapper.Map<IEnumerable<ProductDto>>(productWithMetaData);
            return (productDto, productWithMetaData.metaData);

        }

        public async Task<ProductDtoForUpdate> GetOneProductbyIdAsync(int id, bool trackChanges)
        {
            var product = await GetOneProductByIdAndCheckExist(id, trackChanges);
            return _mapper.Map<ProductDtoForUpdate>(product);
        }

       

        public async Task UpdateOneProductAsync(int id, ProductDtoForUpdate productDto, bool trackChanges)
        {
            var entity = await _manager.Urunler.GetOneProductByIdAsync(id, trackChanges);

            _mapper.Map(productDto, entity);
            _manager.Urunler.UpdateOneProduct(entity);
            await _manager.SaveAsync();
        }
        public async Task<(ProductDtoForUpdate productDtoForUpdate, Urunler urun)> GetOneProductForPatchAsync(int id, bool trackChanges)
        {
            var product = await GetOneProductByIdAndCheckExist(id, trackChanges);
            var productDtoForUpdate = _mapper.Map<ProductDtoForUpdate>(product);
            return (productDtoForUpdate, product);

        }

        public async Task SaveChangesForPatchAsync(ProductDtoForUpdate productDtoForUpdate, Urunler urun)
        {
            _mapper.Map(productDtoForUpdate, urun);
            await _manager.SaveAsync();

        }





        private async Task<Urunler> GetOneProductByIdAndCheckExist(int id, bool trackChanges)
        {

            var entity = await _manager.Urunler.GetOneProductByIdAsync(id, trackChanges);
            if (entity == null)
            {
                throw new ProductNotFoundException(id);
            }
            return entity;

        }

        public async Task<IEnumerable<Urunler>> GetAllProductAsync1(bool trackChanges)
        {
           var entity=await _manager.Urunler.GetAllCustomerAsync1(trackChanges);
            return entity;  
        }
    }

}

