import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../LoginKayıt.css';
import '../Anasayfa.css';
import logo from '../logolar/homelogo.png';

function LoginKayit() {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const initialCategories = [
    { id: 1, name: 'Kategori 1', path: '/kategori1' },
    { id: 2, name: 'Kategori 2', path: '/kategori2' },
    { id: 3, name: 'Kategori 3', path: '/kategori3' },
  ];

  const [categories] = useState(initialCategories); // Sabit kategoriler
  const [showCategories, setShowCategories] = useState(false); // Kategorileri toggle etmek için

  const toggleCategories = () => {
    setShowCategories(!showCategories); // Kategorilerin görünürlüğünü değiştir
  };

  return (
    <div className="login-kayit">
      <header className="App-header">
        <nav className="header-nav">
          <ul className="categories">
            <li><Link to="/kategoriler/elektronik">Elektronik</Link></li>
            {/* Other categories go here */}
          </ul>
        </nav>
        <div className='Arama'>
          <input type="search" placeholder='Ara...' className='AramaCubugu' />
          <button className='Ara' type='submit'>Ara</button>
        </div>
        <div className='headerButtons'>
          <Link to="/LoginKayıt" className='headerGirisKayıt'>Giriş-Kayıt</Link>
          <Link to="/Sepetim" className='sepet'>Sepetim</Link>
          <img className="header-logo" src={logo} alt="logo" />
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

    if (formData.email === '' || formData.sifre === '') {
      alert('Boşlukları doldurun');
      return;
    }

    const url = new URL('https://localhost:7242/api/Customer/Authenticate');
    url.search = new URLSearchParams({
      Email: formData.email,
      Password: formData.sifre
    }).toString();

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } 
         else {
          return response.json().then((error) => {
            throw new Error('Network response was not ok: ' + error.message);
          });
        }
      })
      .then((responseData) => {
        console.log('Sunucudan gelen yanıt:', responseData);
        if (responseData.status==200) {
          alert('Giriş başarılı!');
          onLogin(formData); // Login işlemlerini buraya ekleyebilirsiniz
        } else {
          alert('Giriş başarısız: ' + responseData.error);
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Giriş sırasında bir hata oluştu. Hata mesajı: ' + error.message);
      });
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

function KayitForm({ onShowLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    sifre: '',
    telefon: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); // useNavigate hook'unu kullanıyoruz

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (
      formData.name === '' ||
      formData.surname === '' ||
      formData.email === '' ||
      formData.sifre === '' ||
      formData.telefon === ''
    ) {
      alert('Tüm alanları doldurmanız gerekmektedir.');
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Geçerli bir e-posta girmenizgerekmektedir.');
      return;
    }
  
    const data = {
      Ad: formData.name,
      Soyad: formData.surname,
      email: formData.email,
      sifre: formData.sifre,
      telefon: formData.telefon,
    };
  
    fetch('https://localhost:7242/api/Customer', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw new Error('Network response was not ok: ' + error.message);
          });
        }
      })
      .then((responseData) => {
        if (responseData.success) {
          alert('Kayıt işlemi başarıyla tamamlandı!');
          navigate('/LoginKayıt'); // Kullanıcıyı giriş sayfasına yönlendir
        } else {
          setErrorMessage(responseData.error);
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setErrorMessage('Kayıt işlemi sırasında bir hata oluştu. Hata mesajı: ' + error.message);
      });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="isim">
        <label htmlFor="isim">Adı:</label>
        <input
          type="text"
          id="Ad"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Adınızı girin"
          required
        />
      </div>
      
      <div className="soyisim">
        <label htmlFor="soyisim">Soyadı:</label>
        <input
          type="text"
          id="Soyad"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          placeholder="Soyadınızı girin"
          required
        />
      </div>
      
      <div className="email">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Emailinizi girin"
          required
        />
      </div>
      
      <div className="password">
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
        <label htmlFor="telefon">Telefon:</label>
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
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <button className="buttonKayit" type="submit">
        Kayıt Ol
      </button>
    </form>
  );
}

export default LoginKayit;

