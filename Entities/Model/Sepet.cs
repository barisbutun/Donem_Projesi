namespace Entities.Model
{
    public class Sepet
    {
        Urunler Urunler { get; set; }
        public int SepetId { get; set; }

        public int UrunID { get; set; }

        public int BolgeId { get; set; }

        public Sepet(int SepetId) : base()
        {
            UrunID = Urunler.UrunId;
            this.SepetId = SepetId;
            BolgeId = Urunler.BolgeID;

        }

        


        


    }
}
