using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Concrats
{
    public interface IRepositoryManager
    {
        ITradeRepository  İade{ get; }
        ITradeRepository Urunler { get; }
        ITradeRepository  Siparis{ get; }

        ITradeRepository Sepet {  get; }    


        ITradeRepository Musteri { get; }
        void Save();

    }
}
