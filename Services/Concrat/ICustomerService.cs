using Entities.DataTransferObject;
using Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Concrat
{
    public interface ICustomerService
    {
        Task<IEnumerable<Musteri>> GetAllCustomerAsync(bool trackChanges);
        Task<CustomerDto> GetOneCustomerByIdAsync(int id, bool trackChanges);
        Task<CustomerDto> CreateOneCustomerAsync(Musteri customer);
        Task UpdateOneCustomerAsync(int id, CustomerDtoForUpdate customerDto, bool trackChanges);
        Task DeleteOneCustomerAsync(int id,bool trackChanges);
        Task<(CustomerDtoForUpdate CustomerDtoForUpdate, Musteri musteri)> GetOneCustomerForPatchAsync(int id, bool trackChanges);


        Task SaveChangesForPatchAsync(CustomerDtoForUpdate CustomerDtoForUpdate, Musteri musteri);

    }
}
