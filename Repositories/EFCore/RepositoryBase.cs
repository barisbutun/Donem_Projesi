﻿using Microsoft.EntityFrameworkCore;
using Repositories.Concrats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        private readonly RepositoryContext _context;

        public RepositoryBase(RepositoryContext context) => _context = context;



        public void Create(T entity)=> _context.Set<T>().Add(entity);

        public void Delete(T entity) => _context.Set<T>().Remove(entity);
        public IQueryable<T> FindAll(bool trackChanges) =>
            !trackChanges ?
            _context.Set<T>().AsNoTracking() :
            _context.Set<T>();

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression, bool trackChanges)
         => !trackChanges ?
             _context.Set<T>().Where(expression).AsNoTracking() :
             _context.Set<T>().Where(expression);


        public void Update(T entity) => _context.Set<T>().Update(entity);
    }
}
