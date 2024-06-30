import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoginKayıt.css';
import '../css/Anasayfa.css';
import { Link } from 'react-router-dom';
import logo from '../logolar/homelogo.png';

function LoginKayit() {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const initialCategories = [
    { bolgeId: 1, name: 'Motor' },
    { bolgeId: 2, name: 'Fren Sistem' },
    { bolgeId: 3, name: 'Direksiyon Sistemi' },
    { bolgeId: 4, name: 'Süspansiyon Sistemi' },
    { bolgeId: 5, name: 'Elektrik Sistemi' },
    { bolgeId: 6, name: 'Transmisyon Sistemi' },
    { bolgeId: 7, name: 'Egzoz Sistemi' },
    { bolgeId: 8, name: 'Soğutma Sistemi' },
    { bolgeId: 9, name: 'Yakıt Sistemi' },
    { bolgeId: 10, name: 'Kaporta' },
    { bolgeId: 11, name: 'İç Mekan' },
    { bolgeId: 12, name: 'Güvenlik Sistemleri' },
    { bolgeId: 13, name: 'Diğer' },
  ];

  const [categories] = useState(initialCategories);
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleLogin = (formData) => {
    const { email, sifre } = formData;
    const url = `https://localhost:7242/api/Customer/Authenticate?Email=${encodeURIComponent(email)}&Password=${encodeURIComponent(sifre)}`;

    axios.get(url)
        .then(response => {
            // Giriş başarılı, kullanıcı bilgilerini işleyin
            console.log('Giriş başarılı:', response.data);
            alert('Giriş başarılı!');
            // Kullanıcı bilgilerini localStorage'a kaydedebilir veya başka bir işlem yapabilirsiniz
            localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch(error => {
            // Hata oluştu, hata mesajını işleyin
            console.error('Giriş sırasında hata oluştu:', error);
            alert('Giriş sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edin.');
        });
};

  return (
    <div className="login-kayit">
      <header className="App-header">
        <nav className="header-nav">
          <Link to={'/Filtrele'} className='filtrele'>Filtrele</Link>
          <ul className={`categories ${showCategories ? 'show' : ''}`}>
            {categories.map((category) => (
              <li key={category.bolgeId}>
                <Link to={category.path}>{category.name}</Link>
              </li>
            ))}
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
            <LoginForm onLogin={handleLogin} />
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

  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleForgotPassword = () => {
    setForgotPasswordMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
    // Şifre sıfırlama bağlantısını gönderme işlemi burada yapılacak(axios.post veya fetch ile).
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
      <a onClick={handleForgotPassword}>Şifrenizi mi unuttunuz? </a>
      {forgotPasswordMessage && <p className='forgot-password-mesage'>{forgotPasswordMessage}</p>}
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

    let hata = false;
    if (
      formData.name === '' ||
      formData.surname === '' ||
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
      const data = {
        Ad: formData.name,
        Soyad: formData.surname,
        email: formData.email,
        sifre: formData.sifre,
        telefon: formData.telefon,
      };

      axios.post('https://localhost:7242/api/Customer', data)
        .then(response => {
          if (response.data.success) {
            console.log('Kayıt işlemi başarılı!');
            alert('Kayıt işlemi başarıyla tamamlandı!');
            onShowLogin(); // Giriş formuna geçiş
          } else {
            console.log('Kayıt işlemi başarısız!');
            setErrorMessage(response.data.error);
          }
        })
        .catch(error => {
          console.error('Kayıt işlemi sırasında bir hata oluştu:', error);
          setErrorMessage('Kayıt işlemi sırasında bir hata oluştu. Hata mesajı: ' + error.message);
        });
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

      <div className="soyisim">
        <label htmlFor="soyisim">Soyadı:</label>
        <input
          type="text"
          id="soyisim"
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



// import React, { useState } from 'react';
// import '../css/LoginKayıt.css';
// import '../css/Anasayfa.css';
// import { Link } from 'react-router-dom';
// import logo from '../logolar/homelogo.png';

// function LoginKayit() {
//   const [activeTab, setActiveTab] = useState('login');

//   const handleTabChange = (tabName) => {
//     setActiveTab(tabName);
//   };

//   const initialCategories = [
//     { id: 1, name: 'Kategori 1', path: '/kategori1' },
//     { id: 2, name: 'Kategori 2', path: '/kategori2' },
//     { id: 3, name: 'Kategori 3', path: '/kategori3' },
//   ];

//   const [categories] = useState(initialCategories); // Sabit kategoriler
//   const [showCategories, setShowCategories] = useState(false); // Kategorileri toggle etmek için

//   const toggleCategories = () => {
//     setShowCategories(!showCategories); // Kategorilerin görünürlüğünü değiştir
//   };
//   return (
//     <div className="login-kayit">
//       <header className="App-header">
//         <nav className="header-nav">
//           <button className="menu-toggle" onClick={toggleCategories}>
//             ☰
//           </button>
//           <ul className={`categories ${showCategories ? 'show' : ''}`}>
//             {categories.map((category) => (
//               <li key={category.id}>
//                 <Link to={category.path}>{category.name}</Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <div className='Arama'>
//           <input type="search" placeholder='Ara...' className='AramaCubugu' />
//           <button className='Ara' type='submit'>Ara</button>
//         </div>
//         <div className='headerButtons'>
//           <Link to="/LoginKayıt" className='headerGirisKayıt'>Giriş-Kayıt</Link>
//           <Link to="/Sepetim" className='sepet'>Sepetim</Link>
//           <img className="header-logo" src={logo} alt="logo" />
//         </div>
//       </header>
//       <div className="container">
//         <div className="tabs">
//           <button
//             className={`tab ${activeTab === 'login' ? 'active' : ''}`}
//             onClick={() => handleTabChange('login')}
//           >
//             Giriş Yap
//           </button>
//           <button
//             className={`tab ${activeTab === 'kayit' ? 'active' : ''}`}
//             onClick={() => handleTabChange('kayit')}
//           >
//             Kayıt Ol
//           </button>
//         </div>
//         <div className="content">
//           {activeTab === 'login' && (
//             <LoginForm onLogin={(formData) => { /* Login işlemleri buraya */


//             }} />
//           )}
//           {activeTab === 'kayit' && (
//             <KayitForm onShowLogin={() => handleTabChange('login')} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function LoginForm({ onLogin }) {
//   const [formData, setFormData] = useState({
//     email: '',
//     sifre: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     let hata = false;
//     if (formData.email === '' || formData.sifre === '') {
//       hata = true;
//     }

//     if (hata) {
//       alert('Boşlukları doldurun');
//     } else {
//       onLogin(formData);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="username">
//         <input
//           type="email"
//           placeholder="E-posta Adresi"
//           value={formData.email}
//           onChange={handleChange}
//           name="email"
//           required
//         />
//       </div>
//       <div className="password">
//         <input
//           type="password"
//           placeholder="Şifre"
//           value={formData.sifre}
//           onChange={handleChange}
//           name="sifre"
//           required
//         />
//       </div>
//       <button className="buttonGiris" type="submit">
//         Giriş Yap
//       </button>
//       <Link to='/SifreYenileme'>Şifrenizi mi unuttunuz?</Link>
//     </form>
//   );
// }

// function KayitForm({ onShowLogin }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     surname: '',
//     email: '',
//     sifre: '',
//     telefon: '',
//   });
//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     let hata = false;
//     if (
//       formData.name === '' ||
//       formData.surname === '' ||
//       formData.email === '' ||
//       formData.sifre === '' ||
//       formData.telefon === ''
//     ) {
//       hata = true;
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       hata = true;
//     }

//     if (hata) {
//       alert('Tüm alanları doldurmanız ve geçerli bir e-posta girmeniz gerekmektedir.');
//     } else {
//       const data = {
//         Ad: formData.name,
//         Soyad: formData.surname,
//         email: formData.email,
//         sifre: formData.sifre,
//         telefon: formData.telefon,
//       };

//       fetch('https://localhost:7242/api/Customer', {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok: ' + response.statusText);
//           }
//           return response.json();
//         })
//         .then((responseData) => {
//           if (responseData.success) {
//             console.log('Kayıt işlemi başarılı!');
//             alert('Kayıt işlemi başarıyla tamamlandı!');
//             onShowLogin(); // Giriş formuna geçiş
//           } else {
//             console.log('Kayıt işlemi başarısız!');
//             setErrorMessage(responseData.error);
//           }
//         })
//         .catch((error) => {
//           console.error('There was a problem with the fetch operation:', error);
//           setErrorMessage('Kayıt işlemi sırasında bir hata oluştu. Hata mesajı: ' + error.message);
//         });
//     }
//   };


//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="isim">
//         <label htmlFor="isim">Adı:</label>
//         <input
//           type="text"
//           id="isim"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Adınızı girin"
//           required
//         />
//       </div>

//       <div className="soyisim">
//         <label htmlFor="soyisim">Soyadı:</label>
//         <input
//           type="text"
//           id="soyisim"
//           name="surname"
//           value={formData.surname}
//           onChange={handleChange}
//           placeholder="Soyadınızı girin"
//           required
//         />
//       </div>

//       <div className="email">
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Emailinizi girin"
//           required
//         />
//       </div>
//       <div className="sifre">
//         <label htmlFor="sifre">Şifre:</label>
//         <input
//           type="password"
//           id="sifre"
//           name="sifre"
//           value={formData.sifre}
//           onChange={handleChange}
//           placeholder="Şifrenizi girin"
//           required
//         />
//       </div>
//       <div className="telefon">
//         <label htmlFor="telefon">Telefon Numarası:</label>
//         <input
//           type="text"
//           id="telefon"
//           name="telefon"
//           value={formData.telefon}
//           onChange={handleChange}
//           placeholder="Telefon numaranızı girin"
//           required
//         />
//       </div>
//       {errorMessage && <p className="hata-mesajı">{errorMessage}</p>}
//       <button type="submit"  className="buttonKayit">
//         Kaydol
//       </button>
//     </form>
//   );
// }

// export default LoginKayit;
