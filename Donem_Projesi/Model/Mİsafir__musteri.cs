namespace Donem_Projesi.Model
{
    public class Mİsafir_musteri:Musteri
    {

        
        public bool Misafir_mi {  get; set; }   

        public Mİsafir_musteri() { 
        Id=Guid.NewGuid();

        }
        public Mİsafir_musteri(string ad, string soyad)
        {
            Id = Guid.NewGuid();
            Ad = ad;
            Soyad = soyad;
        }

    }
}
