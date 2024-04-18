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
    public class ShoppingManager:IShoppingService
    {
        private readonly IRepositoryManager _manager;
        private readonly ILoggerService _logger;
        private readonly IMapper _mapper;

        public ShoppingManager(IRepositoryManager manager, ILoggerService logger, IMapper mapper)
        {
            _manager = manager;
            _logger = logger;
            _mapper = mapper;
        }

        public Sepet CreateOneShopping(Sepet shopping)
        {
            _manager.Sepet.CreateOneShopping(shopping);
            _manager.Save();
            return shopping;
        }

        public void DeleteOneShopping(int id, bool trackChanges)
        {
            var entity = _manager.Sepet.GetOneShppingById(id, trackChanges);
            if (entity == null)
            {
                throw new ShoppingNotFoundException(id);
            }
            _manager.Sepet.DeleteOneShopping(entity);
            _manager.Save();
        }

        public IEnumerable<Sepet> GetAllShopping(bool trackChanges)
        {
            return _manager.Sepet.GetAllShopping(trackChanges);
        }

        public Sepet GetOneShoppingById(int id, bool trackChanges)
        {
            var shopping = _manager.Sepet.GetOneShppingById(id, trackChanges);
            if (shopping == null)
            {
                throw new ShoppingNotFoundException(id);
            }
            return shopping;
        }

        public void UpdateOneShopping(int id, ShoppingDtoForUpdate shoppingDto, bool trackChanges)
        {
            var entity = _manager.Sepet.GetOneShppingById(id, trackChanges);

            if (entity == null)
            {
                throw new ShoppingNotFoundException(id);
            }

            entity = _mapper.Map<Sepet>(shoppingDto);
            _manager.Sepet.UpdateOneShopping(entity);
            _manager.Save();
        }
    }
}
