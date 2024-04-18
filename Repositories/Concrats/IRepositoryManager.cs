using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Concrats
{
    public interface IRepositoryManager
    {
        IReturnRepository  İade{ get; }
        IProductRepository Urunler { get; }
        IOrderRepository  Siparis{ get; }

        IShoppingRepository Sepet {  get; }    

        ICustomerRepository Musteri { get; }
        void Save();

    }
}
