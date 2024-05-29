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

        public async Task<CustomerDto> CreateOneCustomerAsync(Musteri customer)
        {
            _manager.Musteri.CreateOneCustomer(customer);
            await _manager.SaveAsync();
            return _mapper.Map<CustomerDto>(customer);

        }

        public async Task DeleteOneCustomerAsync(int id,bool trackChanges)
        {
            var entity = await _manager.Musteri.GetOneCustomerByIdAsync(id, trackChanges);
            

            _manager.Musteri.DeleteOneCustomer(entity);
            _manager.SaveAsync();

        }

        public async Task<IEnumerable<Musteri>> GetAllCustomerAsync(bool trackChanges)
        {
           var entity=await _manager.Musteri.GetAllCustomerAsync(trackChanges);
            return entity;
        }

        public async Task<CustomerDto> GetOneCustomerByIdAsync(int id, bool trackChanges)
        {
            var customer=await _manager.Musteri.GetOneCustomerByIdAsync(id, trackChanges);  
          
            return _mapper.Map<CustomerDto>(customer);

        }
       



        public async Task UpdateOneCustomerAsync(int id, CustomerDtoForUpdate customerDto, bool trackChanges)
        {
            var entity = await _manager.Musteri.GetOneCustomerByIdAsync(id, trackChanges);

            entity = _mapper.Map<Musteri>(customerDto);
             _manager.Musteri.UpdateOneCustomer(entity);
             _manager.SaveAsync();

        }

        
        private async Task<Musteri> GetOneProductByIdAndCheckExist(int id, bool trackChanges)
        {

            var entity = await _manager.Musteri.GetOneCustomerByIdAsync(id, trackChanges);
            if (entity == null)
            {
                throw new CustomerNotFoundException(id);
            }
            return entity;

        }

       public async Task<(CustomerDtoForUpdate CustomerDtoForUpdate, Musteri musteri)> GetOneCustomerForPatchAsync(int id, bool trackChanges)
        {
            var customer =await GetOneProductByIdAndCheckExist(id, trackChanges);
            var customerDtoForUpdate=_mapper.Map<CustomerDtoForUpdate>(customer);
            return(customerDtoForUpdate, customer); 


        }

      public  async Task SaveChangesForPatchAsync(CustomerDtoForUpdate CustomerDtoForUpdate, Musteri musteri)
        {
           _mapper.Map(CustomerDtoForUpdate, musteri);
            await _manager.SaveAsync();
        }
    }
}
