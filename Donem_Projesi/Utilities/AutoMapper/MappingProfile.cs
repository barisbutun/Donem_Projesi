
using AutoMapper;

using Entities.DataTransferObject;
using Entities.Model;
namespace Donem_Projesi.Utilities.AutoMapper
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {

            CreateMap<CustomerDtoForUpdate,Musteri>();
            CreateMap<ProductDtoForUpdate, Urunler>();
            CreateMap<ShoppingDtoForUpdate, Sepet>();
            CreateMap<OrderDtoForUpdate, Sepet>();
            CreateMap<ReturnDtoForUpdate, İade>();



        }



    }
}
