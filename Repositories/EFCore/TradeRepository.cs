using Donem_Projesi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repositories.Concrats;
using Entities.Models;
namespace Repositories
{
    public class TradeRepository : RepositoryBase<İade>,RepositoryBase<Urunler>
    {
        public TradeRepository(RepositoryContext context)
        {
            Context = context;
        }

        public RepositoryContext Context { get; }
    }
}
