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
    public class OrderManager:IOrderService
    {
        private readonly IRepositoryManager _manager;
        private readonly ILoggerService _logger;
        private readonly IMapper _mapper;

        public OrderManager(IRepositoryManager manager, ILoggerService logger, IMapper mapper)
        {
            _manager = manager;
            _logger = logger;
            _mapper = mapper;
        }

        public Siparis CreateOneOrder(Siparis order)
        {
            _manager.Siparis.CreateOneOrder(order);
            _manager.SaveAsync();
            return order;
        }

        public void DeleteOneOrder(int id, bool trackChanges)
        {
            var entity = _manager.Siparis.GetOneOrderById(id, trackChanges);
            if (entity == null)
            {
                throw new OrderNotFoundException(id);
            }
            _manager.Siparis.DeleteOneOrder(entity);
            _manager.SaveAsync();
        }

       

        public IEnumerable<Siparis> GetAllOrder(bool trackChanges)
        {
            return _manager.Siparis.GetAllOrder(trackChanges);
        }

        public Siparis GetOneOrderById(int id, bool trackChanges)
        {
            var order = _manager.Siparis.GetOneOrderById(id, trackChanges);
            if (order == null)
            {
                throw new OrderNotFoundException(id);
            }
            return order;
        }

       
        public void UpdateOneOrder(int id, OrderDtoForUpdate orderDto, bool trackChanges)
        {
            var entity = _manager.Siparis.GetOneOrderById(id, trackChanges);

            if (entity == null)
            {
                throw new OrderNotFoundException(id);
            }

            entity = _mapper.Map<Siparis>(orderDto);
            _manager.Siparis.UpdateOneOrder(entity);
            _manager.SaveAsync();
        }
    }
}
