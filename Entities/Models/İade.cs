namespace Donem_Projesi.Model
{
    public class İade
    {
        int a;

       public Urunler urun_iade {  get; set; } 
      public   Siparis Siparis_iade { get; set; }  

        public  int UrunId_iade { get; set; }
        public int BolgeID_iade { get; set; }

        public int siparis_iade { get; set; }



        public int iade_id { get; set; }    

        public İade(int iade_id) 
        {
            this.iade_id = iade_id;
           
            siparis_iade = Siparis_iade.SiparisID;

            urun_iade.UrunId=siparis_iade;

        }





    }
}
