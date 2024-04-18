namespace Entities.Model
{
    public class Mİsafir_musteri
    {
        public Musteri _musteri {  get; set; }  

        public int Id {  get; set; }    

        public Mİsafir_musteri(int id)
        {
            Id = id;
            
        } 
        
        public bool Misafir_mi {  get; set; }   


    }
}
