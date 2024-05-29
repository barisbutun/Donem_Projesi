import React, { useState } from 'react';
import '../LoginKayıt.css';
import '../Anasayfa.css';
import { Link } from 'react-router-dom'; 
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
<<<<<<< HEAD
          <ul className="categories">
            <li><Link to="/kategoriler/elektronik">Elektronik</Link></li>
            {/* Other categories go here */}
=======
          <button className="menu-toggle" onClick={toggleCategories}>
            ☰
          </button>
          <ul className={`categories ${showCategories ? 'show' : ''}`}>
            {categories.map((category) => (
              <li key={category.id}>
                <Link to={category.path}>{category.name}</Link>
              </li>
            ))}
>>>>>>> b004d7b3900e84ae7ddb7e5ffd4e3a02b3b3e28e
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

    onLogin(formData);
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
      alert('Geçerli bir e-posta girmeniz gerekmektedir.');
      return;
    }

<<<<<<< HEAD
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
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.success) {
          alert('Kayıt işlemi başarıyla tamamlandı!');
          onShowLogin(); // Giriş formuna geçiş
        } else {
          setErrorMessage(responseData.error);
=======
      fetch('https://localhost:7242/api/Customer', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
>>>>>>> b004d7b3900e84ae7ddb7e5ffd4e3a02b3b3e28e
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
          id="Phone"
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
