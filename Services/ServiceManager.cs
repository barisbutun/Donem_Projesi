using AutoMapper;
using Repositories.Concrats;
using Services.Concrat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class ServiceManager:IServiceManager
    {
        private readonly Lazy<IReturnService> _returnService;
        private readonly Lazy<ICustomerService> _customerService;
        private readonly Lazy<IOrderService> _orderService;
        private readonly Lazy<IShoppingService> _shoppingService;
        private readonly Lazy<IProductService> _productService;

        public ServiceManager(IRepositoryManager repositoryManager,
            ILoggerService logger,
            IMapper mapper)
        {
            _returnService=new Lazy<IReturnService>(()=> new ReturnManager (repositoryManager, logger, mapper));
            _customerService = new Lazy<ICustomerService>(()=> new CustomerManager(repositoryManager, logger, mapper));
            _orderService=new Lazy<IOrderService>(()=> new OrderManager(repositoryManager, logger,mapper));
            _shoppingService = new Lazy<IShoppingService>(()=> new ShoppingManager(repositoryManager, logger, mapper));
            _productService = new Lazy<IProductService>(() => new ProductManager(repositoryManager, logger,mapper));


        }
        public IReturnService ReturnService => _returnService.Value;
        public ICustomerService CustomerService => _customerService.Value;
        public IOrderService OrderService => _orderService.Value;
        public IShoppingService ShoppingService => _shoppingService.Value;
        public IProductService ProductService => _productService.Value;




    }
}
