using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore.Extensions
{
    public static class PaginationExtensions
    {
        public const int DEFAULT_PAGE_SIZE = 25;
        public static IQueryable<T> ApplyPagination<T>(this IQueryable<T> query, int page, int size)
        {
            var isRequestedAll = page == 0 && size < 1;
            if (isRequestedAll) return query;
            page = Math.Max(page, 1);
            size = Math.Max(size, DEFAULT_PAGE_SIZE);
            var skip = Math.Max(0, (page - 1) * size);
            query = query.Skip(skip).Take(size);
            return query;
        }

    }
}
