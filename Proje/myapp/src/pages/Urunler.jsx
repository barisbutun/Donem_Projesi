import React, { useState, useEffect } from 'react';
import Urunkartı from './Urunkartı';
import '../Urunler.css';
import images from '../utils/images'; // Resimleri içe aktarın

const Urunler = () => {
  const [urunlerDizisi, setUrunlerDizisi] = useState([]);
  const [sayfa, setSayfa] = useState(1);
  const [resimSayisi, setResimSayisi] = useState(10);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false); // Filtreleme alanının görünürlüğünü saklamak için

  useEffect(() => {
    const fetchUrunler = async () => {
      try {
        const response = await fetch('/api/urunler'); // API URL'sini doğru şekilde güncelleyin
        if (!response.ok) {
          throw new Error('Veriler alınamadı');
        }
        const data = await response.json();

        // Resimleri ekleyin
        const urunlerWithImages = data.map((urun) => ({
          ...urun,
          resim: images[`${urun.imageFileName}`], // Resim dosya adını kullanarak resim yolu ekleyin
        }));

        setUrunlerDizisi(urunlerWithImages);
        setFilteredProducts(urunlerWithImages); // Başlangıçta tüm ürünleri göster
      } catch (error) {
        console.error('Veriler alınamadı:', error.message);
      }
    };

    fetchUrunler();
  }, []);

  const handleSayfaDegistir = (yeniSayfa) => {
    if (yeniSayfa > 0 && yeniSayfa <= Math.ceil(filteredProducts.length / resimSayisi)) {
      setSayfa(yeniSayfa);
    }
  };

  const handleResimSayisiDegistir = (yeniResimSayisi) => {
    const maxSayfaSayisi = Math.ceil(filteredProducts.length / yeniResimSayisi);
    if (sayfa > maxSayfaSayisi) {
      setSayfa(maxSayfaSayisi);
    }
    setResimSayisi(yeniResimSayisi);
  };

  const handleFilter = () => {
    const filtered = urunlerDizisi.filter((urun) => {
      const price = parseFloat(urun.price);
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Infinity;
      return price >= min && price <= max;
    });
    setFilteredProducts(filtered);
    setSayfa(1); // Filtreleme sonrası sayfayı başa al
  };

  const baslangicIndeks = (sayfa - 1) * resimSayisi;
  const bitisIndeks = baslangicIndeks + resimSayisi;
  const gorunenUrunler = filteredProducts.slice(baslangicIndeks, bitisIndeks);

  return (
    <section className="urunSayfasi">
      <div className="filtreleme-toggle" onClick={() => setShowFilter(!showFilter)}>
        {showFilter ? 'Filtreyi Gizle' : 'Filtrele'}
      </div>
      
      {showFilter && (
        <div className="filtreleme">
          <label>
            Min Fiyat:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label>
            Max Fiyat:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </label>
          <button onClick={handleFilter}>Filtrele</button>
        </div>
      )}

      <div className='urunGrid'>
        {gorunenUrunler.length === 0 ? (
          <p>Yükleniyor...</p>
        ) : (
          gorunenUrunler.map((urun) => (
            <Urunkartı key={urun.UrunId} urun={urun} />
          ))
        )}
      </div>

      <footer>
        <div className="sayfalama">
          <button onClick={() => handleSayfaDegistir(sayfa - 1)} disabled={sayfa === 1}>Önceki</button>
          <span>{sayfa} / {Math.ceil(filteredProducts.length / resimSayisi)}</span>
          <button onClick={() => handleSayfaDegistir(sayfa + 1)} disabled={sayfa === Math.ceil(filteredProducts.length / resimSayisi)}>Sonraki</button>
        </div>

        <div className="resimSayisiKontrol">
          <select value={resimSayisi} onChange={(e) => handleResimSayisiDegistir(parseInt(e.target.value))}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </div>
      </footer>
    </section>
  );
};

export default Urunler;




// import React from 'react';
// import Urunkartı from './Urunkartı';
// import Arka_Kapı_Gergisi from '../Urunler/Arka_Kapı_Gergisi.png';
// import On_Panel from '../Urunler/On_Panel.png';
// import Yag_Filtresi from '../Urunler/Yag_Filtresi.png';
// import Sis_Farı_Lambası from '../Urunler/Sis_Farı_Lambası.png';
// import '../Urunler.css';

// const urunler = [
//   { urunId: 1, urunAdı: 'Arka Kapı Gergisi', resim: Arka_Kapı_Gergisi, Fiyat: 200, Acıklama: 'Arka kapı için gergi.' },
//   { urunId: 2, urunAdı: 'Ön Panel', resim: On_Panel, Fiyat: 500, Acıklama: 'Ön panel için açıklama.' },
//   { urunId: 3, urunAdı: 'Yağ Filtresi', resim: Yag_Filtresi, Fiyat: 800, Acıklama: 'Yağ filtresi açıklaması.' },
//   { urunId: 4, urunAdı: 'Sis Farı Lambası', resim: Sis_Farı_Lambası, Fiyat: 400, Acıklama: 'Sis farı lambası açıklaması.' },
// ];

// const Urunler = () => {
//   return (
//     <div className="urunler-sayfasi">
//       <h2>Ürünler</h2>
//       <div className="product-grid">
//         {urunler.map((urun) => (
//           <Urunkartı key={urun.id} urun={urun} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Urunler;