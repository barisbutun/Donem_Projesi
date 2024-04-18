using AutoMapper;
using Entities.DataTransferObject;
using Entities.Exceptions;
using Entities.Model;
using Repositories.Concrats;
using Services.Concrat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
   public class ProductManager:IProductService
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

        public Urunler CreateOneProduct(Urunler product)
        {
            _manager.Urunler.CreateOneProduct(product);
            _manager.Save();
            return product;
        }

        public void DeleteOneProduct(int id, bool trackChanges)
        {
            var entity = _manager.Urunler.GetOneProductById(id, trackChanges);
            if (entity == null)
            {
                throw new ProductNotFoundException(id);
            }
            _manager.Urunler.DeleteOneProduct(entity);
            _manager.Save();
        }

        public IEnumerable<Urunler> GetAllProduct(bool trackChanges)
        {
            return _manager.Urunler.GetAllProduct(trackChanges);
        }

        public Urunler GetOneProductbyId(int id, bool trackChanges)
        {
            var product = _manager.Urunler.GetOneProductById(id, trackChanges);
            if (product == null)
            {
                throw new ProductNotFoundException(id);
            }
            return product;
        }

        

        public void UpdateOneProduct(int id, ProductDtoForUpdate productDto, bool trackChanges)
        {
            var entity = _manager.Urunler.GetOneProductById(id, trackChanges);

            if (entity == null)
            {
                throw new ProductNotFoundException(id);
            }

            entity = _mapper.Map<Urunler>(productDto);
            _manager.Urunler.UpdateOneProduct(entity);
            _manager.Save();
        }
    
       
    }
}
