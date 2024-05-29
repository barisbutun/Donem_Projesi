
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
            CreateMap<Musteri,CustomerDtoForUpdate>();  


            CreateMap<ProductDtoForUpdate, Urunler>();
            CreateMap<Urunler,ProductDtoForUpdate>();

            CreateMap<Urunler, ProductDto>();
            CreateMap<ProductDto, Urunler>();

            CreateMap<ShoppingDtoForUpdate, Sepet>();
            CreateMap<OrderDtoForUpdate, Sepet>();
            CreateMap<ReturnDtoForUpdate, İade>();
            CreateMap<Musteri, CustomerDto>();
            CreateMap<CustomerDto, Musteri>();



        }



    }
}
