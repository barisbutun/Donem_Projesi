import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logolar/login.png';
import Arka_Kapı_Gergisi from '../Urunler/Arka_Kapı_Gergisi.png';
import On_Panel from '../Urunler/On_Panel.png';
import Yag_Filtresi from '../Urunler/Yag_Filtresi.png';
import Sis_Farı_Lambası from '../Urunler/Sis_Farı_Lambası.png';
const HomePage = () => {
  return (
    <div className="App">
      <header className="App-header">
          <img className="header-logo"src={logo} alt='logo' />
        
        <nav className="header-nav">  {/* New navigation element */}
          <ul className="categories">
            <li><Link to="/kategoriler/elektronik">Elektronik</Link></li>
            {/* ... */}
          </ul>
        </nav>
        <div className='headerButtons'>
        <Link to="/Login" className='headerGiris'>Giris Yap</Link>
        <Link to="/Kayit" className='headerKayıtOl'>Kaydol</Link>
        <button className='menu-toggle'>☰</button>
      
        </div>
        
      </header>

      <main className="App-main">
        <section className="hero">
          <div className="hero-text">
            <h2>Hoşgeldiniz!</h2>
            <p>En iyi ürünleri en uygun fiyatlarla keşfedin.</p>
            <Link to="/Urunler" className="btn">Ürünlere Göz At</Link>
          </div>
        </section>

        <section className="featured-products">
          <h2>Öne Çıkan Ürünler</h2>
          <div className="product-grid">
            {/* Ürün kartlarını burada gösterin */}
            <div className="product-card">
              <img src={Arka_Kapı_Gergisi} />
              <h3>Arka Kapı Gergisi</h3>
              <p>200TL</p>
              <Link to="/urun/1" className="btn">Detaylara Git</Link>
            </div>

            <div className="product-card">
              <img src={On_Panel} />
              <h3>Ön_Panel</h3>
              <p>500TL</p>
              <Link to="/urun/2" className="btn">Detaylara Git</Link>
            </div>

            <div className="product-card">
              <img src={Yag_Filtresi} />
              <h3>Yag_Filtresi</h3>
              <p>800Tl</p>
              <Link to="/urun/3" className="btn">Detaylara Git</Link>
            </div>

            <div className="product-card">
              <img src={Sis_Farı_Lambası} />
              <h3>Sis_farı_Lambası</h3>
              <p>400Tl</p>
              <Link to="/urun/4" className="btn">Detaylara Git</Link>
            </div>

            {/* ... */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
