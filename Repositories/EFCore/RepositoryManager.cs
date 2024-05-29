using Entities.Model;
using Repositories.Concrats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _context;
        private readonly Lazy<IReturnRepository> _returnRepository;
        private readonly Lazy<ICustomerRepository> _customerRepository;
        private readonly Lazy<IProductRepository> _ProductRepository;
        private readonly Lazy<IShoppingRepository> _ShoppingRepository;
        private readonly Lazy<IOrderRepository> _OrderRepository;


        public RepositoryManager(RepositoryContext context)
        {

            _context = context;
            _returnRepository= new Lazy<IReturnRepository>(()=> new ReturnRepository(_context));
            _customerRepository= new Lazy<ICustomerRepository>(()=> new CustomerRepository(_context));
            _ProductRepository= new Lazy<IProductRepository>(()=> new ProductRepository(_context));
            _ShoppingRepository = new Lazy<IShoppingRepository>(() => new ShoppingRepository(_context));
            _OrderRepository= new Lazy<IOrderRepository>(()=> new OrderRepository(_context));


        }


        public IReturnRepository İade => _returnRepository.Value;

        public IProductRepository Urunler =>  _ProductRepository.Value;

        public IOrderRepository Siparis => _OrderRepository.Value;

        public IShoppingRepository Sepet => _ShoppingRepository.Value;

        public ICustomerRepository Musteri => _customerRepository.Value;

        public async Task SaveAsync()
        {
          await  _context.SaveChangesAsync(); 
        }
    }
}