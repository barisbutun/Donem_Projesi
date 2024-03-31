using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Donem_Projesi.Model;



namespace Repositories.Concrats
{
    public interface ITradeRepository:IRepositoryBase<İade>, IRepositoryBase<Urunler>, IRepositoryBase<Musteri>, IRepositoryBase<Sepet>, IRepositoryBase<Siparis>
    {
        IQueryable<İade> GetAllReturn(bool trackChanges);
      İade GetOneReturnById(int id, bool trackChanges);

        IQueryable<Urunler> GetAllProduct(bool trackChanges);
        Urunler GetOneProductById(int id, bool trackChanges);

        IQueryable<Musteri> GetAllCustomer(bool trackChanges);
        Musteri GetOneCustomerById(int id, bool trackChanges);

        IQueryable<Sepet> GetAllShopping(bool trackChanges);
        İade GetOneShppingById(int id, bool trackChanges);

        IQueryable<Siparis> GetAllOrder(bool trackChanges);
        Siparis GetOneOrderById(int id, bool trackChanges);


        void CreateOneReturn(İade Returns);
        void UpdateOneReturn(İade Returns);
        void DeleteOneReturn(İade Returns);

        void CreateOneProduct(Urunler Product);
        void UpdateOneProduct(Urunler Product);
        void DeleteOneProduct(Urunler Product);

        void CreateOneCustomer(Musteri Customer);
        void UpdateOneCustomer(Musteri Customer);
        void DeleteOneCustomer(Musteri Customer);

        void CreateOneShopping(Sepet Shopping);
        void UpdateOneShopping(Sepet Shopping);
        void DeleteOneShopping(Sepet Shopping);

        void CreateOneOrder(Siparis Order);
        void UpdateOneOrder(Siparis Order);
        void DeleteOneOrder(Siparis Order);


    }
}
