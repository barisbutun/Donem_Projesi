using System;
using System.Linq;
using Entities.Model;
using System.Linq.Dynamic.Core;
using System.Reflection.Metadata.Ecma335;

namespace Repositories.EFCore.Extensions
{
    public static class ProductRepositoryExtensions
    {
        // Ürünleri fiyat aralığına göre filtreler
        public static IQueryable<Urunler> FilterProducts(this IQueryable<Urunler> urun,
            uint minPrice, uint maxPrice) => urun.Where(u => u.Price >= minPrice && u.Price <= maxPrice);

        // Ürünleri marka adına göre arar
        public static IQueryable<Urunler> Search(this IQueryable<Urunler> urunler,
            string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return urunler;

            var lowerCaseTerm = searchTerm.Trim().ToLower();
            return urunler
                .Where(u => u.Parca_Adi.ToLower().Contains(lowerCaseTerm));
        }
        public static IQueryable<Urunler> BolgeID(this IQueryable<Urunler> urun, int? bolgeId)
        {
            if (bolgeId is not null)
            {
                urun = urun.Where(u => u.BolgeID == bolgeId);
            }

            return urun;
        }
           
        // Ürünleri verilen sıralama sorgusuna göre sıralar
        public static IQueryable<Urunler> Sort(this IQueryable<Urunler> urunler,
           string orderByQueryString)
        {
            if (string.IsNullOrWhiteSpace(orderByQueryString))
                return urunler.OrderBy(u => u.UrunID);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Urunler>(orderByQueryString);

            if (orderQuery is null)
                return urunler.OrderBy(u => u.UrunID);

            return urunler.OrderBy(orderQuery);
        }
    }
}
