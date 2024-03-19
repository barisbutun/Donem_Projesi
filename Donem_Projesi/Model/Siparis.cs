
using Donem_Projesi.Model;
using Microsoft.Extensions.Options;
namespace Donem_Projesi.Model
{
    public class Siparis:Urunler
    { 
        public int SiparisID { get; set; }  
        Musteri musteri { get; set; }
        Guid musteriId;
        int bolgeId;
        public Siparis(int SiparisId):base(){

            musteriId = musteri.Id;
            this.SiparisID = SiparisId;
        
        }




    }
}
