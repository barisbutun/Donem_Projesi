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

        public async Task<ProductDto> CreateOneProductAsync(Urunler product)
        {
            _manager.Urunler.CreateOneProduct(product);
            await _manager.SaveAsync();
            return _mapper.Map<ProductDto>(product);
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

        public async Task<ProductDto> GetOneProductbyIdAsync(int id, bool trackChanges)
        {
            var product = await GetOneProductByIdAndCheckExist(id, trackChanges);
            return _mapper.Map<ProductDto>(product);
        }

       

        public async Task UpdateOneProductAsync(int id, ProductDtoForUpdate productDto, bool trackChanges)
        {
            var entity = await _manager.Urunler.GetOneProductByIdAsync(id, trackChanges);


            entity = _mapper.Map<Urunler>(productDto);
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

    }

}

