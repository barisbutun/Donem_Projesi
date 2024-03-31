import { useState } from "react";
import Giris from "./Giris";

function Kayit() {
    const [name, setName] = useState('');
    const [sifre, setSifre] = useState('');
    const[telefon,setTelefon]=useState('');
    const[email,setEmail]=useState('');
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
    const handleSifreChange = (event) => {
      setSifre(event.target.value);
    };
    const handleTelefonChange = (event) => {
        setTelefon(event.target.value);
      };
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(' Adı:', name);
      console.log('Şifre:', sifre);
      console.log('Telefon:', telefon);
      console.log('Email:', email);
    };

    const[giris,setGiris]=useState(false);
    const handleGirisClick=()=>{
      setGiris(true);
    }

    if(giris){
      return <Giris/>
    }
  return (
    <div className='kayıt'>
      <div className='containerKayit'>
      <h1 className='baslıkKayit'>Kayıt Ol</h1>
      <form onSubmit={handleSubmit}>
        <div className='isim'>
          <label htmlFor="isim">Adı:</label> 
           <input
            type="text"
            id='isim'
            value={name}
            onChange={handleNameChange}
            placeholder='Adınızı girin'
            required
          />
        </div>

        <div className='sifre'>
          <label htmlFor="sifre">Şifre:</label>        
          <input
            type="password"
            id='sifre'
            value={sifre}
            onChange={handleSifreChange}
            placeholder='Şifrenizi girin'
            required
          />
        </div>

        <div className='telefon'>
          <label htmlFor="telefon">Telefon Numarası:</label>        
          <input
            type="text"
            id='telefon'
            value={telefon}
            onChange={handleTelefonChange}
            placeholder='Telefon numaranızı girin'
            required
          />
        </div>

        <div className='email'>
          <label htmlFor="email">Email:</label>        
          <input
            type="email"
            id='email'
            value={email}
            onChange={handleEmailChange}
            placeholder='Emailinizi girin'
            required
          />
        </div>

        <div className='button'>
         <button onClick={handleGirisClick} className="buttonKayit" type='submit'>Kaydol</button> 
        </div>
      </form>
    </div>
    </div>
  )
}

export default Kayit
