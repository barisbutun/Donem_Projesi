import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logolar/login.png';
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
            <Link to="/urunler" className="btn">Ürünlere Göz At</Link>
          </div>
        </section>

        <section className="featured-products">
          <h2>Öne Çıkan Ürünler</h2>
          <div className="product-grid">
            {/* Ürün kartlarını burada gösterin */}
            <div className="product-card">
              <img src="" />
              <h3>Ürün 1</h3>
              <p>Fiyat: TL</p>
              <Link to="/urun/1" className="btn">Detaylara Git</Link>
            </div>
            {/* ... */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
