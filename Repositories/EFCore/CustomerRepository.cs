using Entities.Model;
using Microsoft.EntityFrameworkCore;
using Repositories.Concrats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore
{
    public class CustomerRepository : RepositoryBase<Musteri>, ICustomerRepository
    {
        public CustomerRepository(RepositoryContext context) : base(context) { }

        public void CreateOneCustomer(Musteri Customer)=>Create(Customer);


        public void DeleteOneCustomer(Musteri Customer)=>Delete(Customer);
        

        public async Task<IQueryable<Musteri>> GetAllCustomerAsync(bool trackChanges)
        {
            return  FindAll(trackChanges)
                  .OrderBy(b => b.Id);
        }

        public async  Task<Musteri> GetOneCustomerByIdAsync(int id, bool trackChanges)
        => await FindByCondition(b => b.Id.Equals(id), trackChanges).SingleOrDefaultAsync();

        public void UpdateOneCustomer(Musteri Customer)=> Update(Customer);

    }
}