import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logolar/homelogo.png';
import '../Anasayfa.css';
import Arka_Kapı_Gergisi from '../Urunler/Arka_Kapı_Gergisi.png';
import On_Panel from '../Urunler/On_Panel.png';
import Yag_Filtresi from '../Urunler/Yag_Filtresi.png';
import Sis_Farı_Lambası from '../Urunler/Sis_Farı_Lambası.png';

const categories = [
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

const HomePage = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/urunler'); // API URL'sini uygun şekilde güncelleyin
        if (!response.ok) {
          throw new Error('Ürünler alınamadı.');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Başlangıçta tüm ürünleri göster
      } catch (error) {
        console.error('Hata:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = products.filter((product) => product.category === category);
    setFilteredProducts(filtered);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="header-nav">
          <button className="menu-toggle" onClick={toggleCategories}>
            ☰
          </button>
          <ul className={`categories ${showCategories ? 'show' : ''}`}>
            {categories.map((category) => (
              <li key={category.bolgeId} onClick={() => handleCategoryClick(category.name)}>
                <a>{category.name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className='Arama'>
          <form onSubmit={handleSearch}>
            <input
              type="search"
              placeholder='Ara...'
              className='AramaCubugu'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className='Ara' type='submit'>Ara</button>
          </form>
        </div>
        <div className='headerButtons'>
          <Link to="/LoginKayıt" className='headerGirisKayıt'>Giriş-Kayıt</Link>
          <Link to="/Sepetim" className='sepet'>Sepetim</Link>
          <img className="header-logo" src={logo} alt="logo" />
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
            <div className="product-card">
              <img src={Arka_Kapı_Gergisi} alt="Arka Kapı Gergisi" />
              <h3>Arka Kapı Gergisi</h3>
              <p>200TL</p>
              <Link to="/urun/1" className="btn">Detaylara Git</Link>
            </div>
            <div className="product-card">
              <img src={On_Panel} alt="Ön Panel" />
              <h3>Ön Panel</h3>
              <p>500TL</p>
              <Link to="/urun/2" className="btn">Detaylara Git</Link>
            </div>
            <div className="product-card">
              <img src={Yag_Filtresi} alt="Yağ Filtresi" />
              <h3>Yağ Filtresi</h3>
              <p>800TL</p>
              <Link to="/urun/3" className="btn">Detaylara Git</Link>
            </div>
            <div className="product-card">
              <img src={Sis_Farı_Lambası} alt="Sis Farı Lambası" />
              <h3>Sis Farı Lambası</h3>
              <p>400TL</p>
              <Link to="/urun/4" className="btn">Detaylara Git</Link>
            </div>
          </div>
        </section>

        <section className="category-products">
          <h2>{selectedCategory ? `${selectedCategory} Ürünleri` : 'Tüm Ürünler'}</h2>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price} TL</p>
                <Link to={`/urun/${product.id}`} className="btn">Detaylara Git</Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;


//import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../logolar/homelogo.png';
// import Arka_Kapı_Gergisi from '../Urunler/Arka_Kapı_Gergisi.png';
// import On_Panel from '../Urunler/On_Panel.png';
// import Yag_Filtresi from '../Urunler/Yag_Filtresi.png';
// import Sis_Farı_Lambası from '../Urunler/Sis_Farı_Lambası.png';
// import '../Anasayfa.css';

// const HomePage = () => {
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
//     <div className="App">
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
//       <main className="App-main">
//         <section className="hero">
//           <div className="hero-text">
//             <h2>Hoşgeldiniz!</h2>
//             <p>En iyi ürünleri en uygun fiyatlarla keşfedin.</p>
//             <Link to="/Urunler" className="btn">Ürünlere Göz At</Link>
//           </div>
//         </section>
//         <section className="featured-products">
//           <h2>Öne Çıkan Ürünler</h2>
//           <div className="product-grid">
//             {/* Ürün kartlarını burada gösterin */}
//             <div className="product-card">
//               <img src={Arka_Kapı_Gergisi} alt="Arka Kapı Gergisi" />
//               <h3>Arka Kapı Gergisi</h3>
//               <p>200TL</p>
//               <Link to="/urun/1" className="btn">Detaylara Git</Link>
//             </div>
//             <div className="product-card">
//               <img src={On_Panel} alt="Ön Panel" />
//               <h3>Ön Panel</h3>
//               <p>500TL</p>
//               <Link to="/urun/2" className="btn">Detaylara Git</Link>
//             </div>
//             <div className="product-card">
//               <img src={Yag_Filtresi} alt="Yağ Filtresi" />
//               <h3>Yağ Filtresi</h3>
//               <p>800TL</p>
//               <Link to="/urun/3" className="btn">Detaylara Git</Link>
//             </div>
//             <div className="product-card">
//               <img src={Sis_Farı_Lambası} alt="Sis Farı Lambası" />
//               <h3>Sis Farı Lambası</h3>
//               <p>400TL</p>
//               <Link to="/urun/4" className="btn">Detaylara Git</Link>
//             </div>
//             {/* ... */}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default HomePage;