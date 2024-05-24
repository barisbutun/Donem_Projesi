import React, { useState } from 'react';
import '../LoginKayıt.css';
import '../Anasayfa.css';
import { Link } from 'react-router-dom';
import logo from '../logolar/homelogo.png';

function LoginKayit() {
  const [activeTab, setActiveTab] = useState('login'); // Aktif sekmeyi yönetmek için state

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="login-kayit">
         <header className="App-header">
          <img className="header-logo"src={logo} alt='logo' />
        <nav className="header-nav">  {/* New navigation element */}
          <ul className="categories">
            <li><Link to="/kategoriler/elektronik">Elektronik</Link></li>
            {/* ... */}
          </ul>
        </nav>
      <div className='Arama'>
      <input type="search" placeholder='Ara...' className='AramaCubugu'/>
        <button className='Ara' type='submit'> Ara</button>
      </div>
   
        <div className='headerButtons'> 
        
        <Link to="/LoginKayıt" className='headerGirisKayıt'>Giris-Kayıt</Link>
        <Link to="/Sepetim" className='sepet'>Sepetim</Link>
        <button className='menu-toggle'>☰</button>
        </div>
        
      </header>
     
      <div className="container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Giriş Yap
          </button>
          <button
            className={`tab ${activeTab === 'kayit' ? 'active' : ''}`}
            onClick={() => handleTabChange('kayit')}
          >
            Kayıt Ol
          </button>
        </div>
        <div className="content">
          {activeTab === 'login' && (
            <LoginForm onLogin={(formData) => { /* Login işlemleri buraya */ }} />
          )}
          {activeTab === 'kayit' && (
            <KayitForm onShowLogin={() => handleTabChange('login')} />
          )}
        </div>
      </div>
    </div>
  );
}

// Login Form
function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    sifre: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hata = false;
    if (formData.email === '' || formData.sifre === '') {
      hata = true;
    }

    if (hata) {
      alert('Boşlukları doldurun');
    } else {
      onLogin(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="username">
        <input
          type="email"
          placeholder="E-posta Adresi"
          value={formData.email}
          onChange={handleChange}
          name="email"
          required
        />
      </div>

      <div className="password">
        <input
          type="password"
          placeholder="Şifre"
          value={formData.sifre}
          onChange={handleChange}
          name="sifre"
          required
        />
      </div>

      <button className="buttonGiris" type="submit">
        Giriş Yap
      </button>
      <Link to='/SifreYenileme'>Şifrenizi mi unuttunuz?</Link>
    </form>
  );
}

// Kayıt Formu
function KayitForm({ onShowLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sifre: '',
    telefon: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        let hata = false;
        if (
          formData.name === '' ||
          formData.email === '' ||
          formData.sifre === '' ||
          formData.telefon === ''
        ) {
          hata = true;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          hata = true;
        }
    
        if (hata) {
          alert('Tüm alanları doldurmanız ve geçerli bir e-posta girmeniz gerekmektedir.');
        } else {
          // **Sunucuya veri gönderme işlemini buraya ekleyin**
    
          // Örnek: Fetch API kullanarak veri gönderme
    
          const data = {
            name: formData.name,
            email: formData.email,
            sifre: formData.sifre,
            telefon: formData.telefon,
          };
    
          fetch('/Donem_Projesi/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((responseData) => {
              if (responseData.success) {
                // Kayıt işlemi sonrası yapılacak işlemleri buraya ekleyin
                console.log('Kayıt işlemi başarılı!');
                alert('Kayıt işlemi başarıyla tamamlandı!');
                onShowLogin(); // Giriş formuna geçiş
              } else {
                // Hata mesajı gösterin
                console.log('Kayıt işlemi başarısız!');
                setErrorMessage(responseData.error); // Hata mesajını state'e ekleyin
              }
            });
    
          // **Sunucuya veri gönderme işleminin sonu**
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <div className="isim">
            <label htmlFor="isim">Adı:</label>
            <input
              type="text"
              id="isim"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Adınızı girin"
              required
            />
          </div>
    
          <div className="email">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Emailinizi girin"
              required
            />
          </div>
    
          <div className="sifre">
            <label htmlFor="sifre">Şifre:</label>
            <input
              type="password"
              id="sifre"
              name="sifre"
              value={formData.sifre}
              onChange={handleChange}
              placeholder="Şifrenizi girin"
              required
            />
          </div>
    
          <div className="telefon">
            <label htmlFor="telefon">Telefon Numarası:</label>
            <input
              type="text"
              id="telefon"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              placeholder="Telefon numaranızı girin"
              required
            />
          </div>
    
          {errorMessage && <p className="hata-mesajı">{errorMessage}</p>}
    
          <button type="submit" className="buttonKayit">
            Kaydol
          </button>
        </form>
      );
    }
    
    export default LoginKayit;
    
