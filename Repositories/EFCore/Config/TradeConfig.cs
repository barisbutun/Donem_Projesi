using Donem_Projesi.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.EFCore.Config
{
    public class TradeConfig<Tentity> : IEntityTypeConfiguration<İade>, IEntityTypeConfiguration<Urunler>, IEntityTypeConfiguration<Kayitli_Musteri>, IEntityTypeConfiguration<Mİsafir_musteri>, IEntityTypeConfiguration<Musteri>, IEntityTypeConfiguration<Sepet>, IEntityTypeConfiguration<Siparis>
    {





        public void Configure(EntityTypeBuilder<İade> builder)
        {


        }
        public void Configure(EntityTypeBuilder<Urunler> builder)
        {

        }
        public void Configure(EntityTypeBuilder<Kayitli_Musteri> builder)
        {


        }

        public void Configure(EntityTypeBuilder<Mİsafir_musteri> builder)
        {


        }

        public void Configure(EntityTypeBuilder<Musteri> builder)
        {

        }

        public void Configure(EntityTypeBuilder<Sepet> builder)
        {


        }

        public void Configure(EntityTypeBuilder<Siparis> builder)
        {

        }
    }
}
