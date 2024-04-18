using Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Concrats
{
    public interface ICustomerRepository:IRepositoryBase<Musteri>
    {

        IQueryable<Musteri> GetAllCustomer(bool trackChanges);
        Musteri GetOneCustomerById(int id, bool trackChanges);

        void CreateOneCustomer(Musteri Customer);
        void UpdateOneCustomer(Musteri Customer);
        void DeleteOneCustomer(Musteri Customer);


    }
}
