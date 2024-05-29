using Entities.Model;

using Microsoft.EntityFrameworkCore;
using System.Reflection;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Repositories
{
    public class RepositoryContext:DbContext
    {

        public RepositoryContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<İade> İade { get; set; }
        public DbSet<Urunler> Urunler { get; set; }
        public DbSet<Musteri> musteri{ get; set; }
        public DbSet<Sepet> Sepet { get; set; }

        public DbSet<Siparis> Siparisler { get; set; }

        

       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<İade>().HasKey(i => i.iade_id);
            modelBuilder.Entity<Urunler>().HasKey(u => u.UrunID);
            modelBuilder.Entity<Musteri>().HasKey(m => m.Id);
            modelBuilder.Entity<Sepet>().HasKey(s => s.SepetId);
            modelBuilder.Entity<Siparis>().HasKey(s => s.SiparisID);
        }

       



    }
}
