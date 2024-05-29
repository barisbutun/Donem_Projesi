using System;
using System.Linq;
using Entities.Model;
using System.Linq.Dynamic.Core;

namespace Repositories.EFCore.Extensions
{
    public static class ProductRepositoryExtensions
    {
        // Ürünleri fiyat aralığına göre filtreler
        public static IQueryable<Urunler> FilterProducts(this IQueryable<Urunler> urun,
            int minPrice, int maxPrice) => urun.Where(u => u.Price >= minPrice && u.Price <= maxPrice);

        // Ürünleri marka adına göre arar
        public static IQueryable<Urunler> Search(this IQueryable<Urunler> urunler,
            string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return urunler;

            var lowerCaseTerm = searchTerm.Trim().ToLower();
            return urunler
                .Where(u => u.Marka_Adi.ToLower().Contains(lowerCaseTerm));
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
