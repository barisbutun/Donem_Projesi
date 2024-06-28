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
        const response = await fetch('https://localhost:7242/api/product/All_Prodcut'); // API URL'sini doğru şekilde güncelleyin
        if (!response.ok) {
          throw new Error('Veriler alınamadı');
        }
        const data = await response.json();

        // Resimleri ekleyin
        const urunlerWithImages = data.map((urun) => ({
          ...urun,
          resim: images[urun.ProductImage], // UrunId kullanarak resim yolu ekleyin
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
      <div className='urunGrid'>
        {gorunenUrunler.length === 0 ? (
          <p>Yükleniyor...</p>
        ) : (
          gorunenUrunler.map((urun) => (
            <Urunkartı key={urun.urunID} urun={urun} />
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
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </footer>
    </section>
  );
};

export default Urunler;