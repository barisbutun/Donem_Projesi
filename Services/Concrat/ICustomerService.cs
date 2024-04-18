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
        IEnumerable<Musteri> GetAllCustomer(bool trackChanges);
        Musteri GetOneCustomerById(int id, bool trackChanges);
        Musteri CreateOneCustomer(Musteri customer);
        void UpdateOneCustomer(int id, CustomerDtoForUpdate customerDto, bool trackChanges);
        void DeleteOneCustomer(int id,bool trackChanges);


    }
}
