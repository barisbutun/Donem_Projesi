using Entities.DataTransferObject;
using Entities.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Concrat
{
    public interface IShoppingService
    {
        IEnumerable<Sepet> GetAllShopping(bool trackChanges);
        Sepet GetOneShoppingById(int id, bool trackChanges);
       Task <Sepet> CreateOneShopping(Sepet shopping);
        void UpdateOneShopping(int id, ShoppingDtoForUpdate shoppingDto, bool trackChanges);
        void DeleteOneShopping(int id, bool trackChanges);
    }
}
