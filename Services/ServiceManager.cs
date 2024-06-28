using AutoMapper;
using Microsoft.AspNetCore.Hosting;
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
        private readonly Lazy<IFileService> _fileService;   
        public ServiceManager(IRepositoryManager repositoryManager,
            ILoggerService logger,
            IMapper mapper,IWebHostEnvironment environment)
        {
            _returnService=new Lazy<IReturnService>(()=> new ReturnManager (repositoryManager, logger, mapper));
            _customerService = new Lazy<ICustomerService>(()=> new CustomerManager(repositoryManager, logger, mapper));
            _orderService=new Lazy<IOrderService>(()=> new OrderManager(repositoryManager, logger,mapper));
            _shoppingService = new Lazy<IShoppingService>(()=> new ShoppingManager(repositoryManager, logger, mapper));
            _productService = new Lazy<IProductService>(() => new ProductManager(repositoryManager, logger,mapper));
            _fileService = new Lazy<IFileService>(() => new FileService(environment));

        }
        public IReturnService ReturnService => _returnService.Value;
        public ICustomerService CustomerService => _customerService.Value;
        public IOrderService OrderService => _orderService.Value;
        public IShoppingService ShoppingService => _shoppingService.Value;
        public IProductService ProductService => _productService.Value;

        public IFileService FileService => _fileService.Value;  



    }
}
