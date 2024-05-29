namespace Entities.Model
{
    public class Siparis
    {
        public int SiparisID { get; set; }
        public int UrunID { get; set; } // Foreign key property
        public Urunler Urunler { get; set; }
    }
}
