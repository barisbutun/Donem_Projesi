using AutoMapper;
using Entities.DataTransferObject;
using Entities.Exceptions;
using Entities.Model;
using Repositories.Concrats;
using Services.Concrat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;


namespace Services
{
    public class CustomerManager : ICustomerService
    {
        private readonly IRepositoryManager _manager;
        private readonly ILoggerService _logger;
        private readonly IMapper _mapper;

        public CustomerManager(IRepositoryManager manager, ILoggerService logger, IMapper mapper)
        {
            _manager = manager;
            _logger = logger;
            _mapper = mapper;
        }   

        public Musteri CreateOneCustomer(Musteri customer)
        {
            _manager.Musteri.CreateOneCustomer(customer);
            _manager.Save();
            return customer;

        }

        public void DeleteOneCustomer(int id,bool trackChanges)
        {
            var entity = _manager.Musteri.GetOneCustomerById(id, trackChanges);
            if(entity == null)
            {
                throw new CustomerNotFoundException(id);

            }
            _manager.Musteri.DeleteOneCustomer(entity);
            _manager.Save();

        }

        public IEnumerable<Musteri> GetAllCustomer(bool trackChanges)
        {
           return _manager.Musteri.GetAllCustomer(trackChanges);

        }

        public Musteri GetOneCustomerById(int id, bool trackChanges)
        {
            var Customer=_manager.Musteri.GetOneCustomerById(id,trackChanges);  
            if(Customer == null)
            {
                throw new CustomerNotFoundException(id);
                

            }
            return Customer;

        }

        public void UpdateOneCustomer(int id, CustomerDtoForUpdate customerDto, bool trackChanges)
        {
            var entity = _manager.Musteri.GetOneCustomerById(id, trackChanges);

            if(entity == null)
            {
                throw new CustomerNotFoundException(id);

            }

            entity=_mapper.Map<Musteri>(customerDto);
            _manager.Musteri.Update(entity);
            _manager.Save();    



        }
    }
}
