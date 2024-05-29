using Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Concrats
{
    public interface ICustomerRepository : IRepositoryBase<Musteri>
    {

        Task<IQueryable<Musteri>> GetAllCustomerAsync(bool trackChanges);
        Task<Musteri> GetOneCustomerByIdAsync(int id, bool trackChanges);

        void CreateOneCustomer(Musteri Customer);
        void UpdateOneCustomer(Musteri Customer);
        void DeleteOneCustomer(Musteri Customer);


    }
}