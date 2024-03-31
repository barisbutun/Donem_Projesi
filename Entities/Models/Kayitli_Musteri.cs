using System.Transactions;

namespace Donem_Projesi.Model
{
    public class Kayitli_Musteri:Musteri
    {
        public bool Kayitli_Musteri_mi {  get; set; }

        public Kayitli_Musteri(bool kayitli_musteri_mi):base() {

            Kayitli_Musteri_mi = kayitli_musteri_mi;

        }




    }
}
