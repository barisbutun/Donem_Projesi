using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Concrat
{
    public interface IServiceManager
    {
        IProductService ProductService { get; }
        ICustomerService CustomerService { get; }
        IReturnService ReturnService { get; }
        IShoppingService ShoppingService { get; }   
        IOrderService OrderService { get; }


    }
}
