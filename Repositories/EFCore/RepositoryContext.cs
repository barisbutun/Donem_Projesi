using Donem_Projesi.Model;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

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

        public DbSet<Kayitli_Musteri> Kayitli_Musteris { get; set; }
        public DbSet<Mİsafir_musteri> mİsafir_Musteris { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());


        }


    }
}
