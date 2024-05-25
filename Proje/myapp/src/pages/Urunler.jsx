import React, { useState, useEffect } from 'react';
import Urunkartı from './Urunkartı';
import '../Urunler.css';

const Urunler = () => {
  const [urunlerDizisi, setUrunlerDizisi] = useState([]);
  const [sayfa, setSayfa] = useState(1);
  const [resimSayisi, setResimSayisi] = useState(10);

  useEffect(() => {
    const yeniUrunlerDizisi = [];
    const urunlerContext = require.context('../Urunler', false, /\.(png|jpg|jpeg)$/i);

    urunlerContext.keys().forEach((dosyaYolu) => {
      const resim = urunlerContext(dosyaYolu);
      const dosyaAdı = dosyaYolu.replace('./', ''); // Dosya adını alın
      const urunAdı = dosyaAdı.replace(/\.[^/.]+$/, ""); // Ürün adını alın (uzantıyı kaldırın)

      yeniUrunlerDizisi.push({
        resim: resim,
        urunAdı: urunAdı,
        Fiyat: Math.floor(Math.random() * 100) + 1, // Örnek fiyat
        Acıklama: 'Bu bir örnek açıklamadır.' // Örnek açıklama
      });
    });

    setUrunlerDizisi(yeniUrunlerDizisi);
  }, []);

  const handleSayfaDegistir = (yeniSayfa) => {
    if (yeniSayfa > 0 && yeniSayfa <= Math.ceil(urunlerDizisi.length / resimSayisi)) {
      setSayfa(yeniSayfa);
    }
  };

  const handleResimSayisiDegistir = (yeniResimSayisi) => {
    const maxSayfaSayisi = Math.ceil(urunlerDizisi.length / yeniResimSayisi);
    if (sayfa > maxSayfaSayisi) {
      setSayfa(maxSayfaSayisi);
    }
    setResimSayisi(yeniResimSayisi);
  };

  const baslangicIndeks = (sayfa - 1) * resimSayisi;
  const bitisIndeks = baslangicIndeks + resimSayisi;
  const gorunenUrunler = urunlerDizisi.slice(baslangicIndeks, bitisIndeks);

 
  return (
    <section className="urunSayfasi">
      <div className='urunGrid'>
        {gorunenUrunler.length === 0 ? (
          <p>Yükleniyor...</p>
        ) : (
          gorunenUrunler.map((urun, index) => (
            <Urunkartı key={index} urun={urun} />
          ))
        )}
      </div>

      <footer>
        <div className="sayfalama">
          <button onClick={() => handleSayfaDegistir(sayfa - 1)} disabled={sayfa === 1}>Önceki</button>
          <span>{sayfa} / {Math.ceil(urunlerDizisi.length / resimSayisi)}</span>
          <button onClick={() => handleSayfaDegistir(sayfa + 1)} disabled={sayfa === Math.ceil(urunlerDizisi.length / resimSayisi)}>Sonraki</button>
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

      <div className='urunGrid'>
        {gorunenUrunler.length === 0 ? (
          <p>Yükleniyor...</p>
        ) : (
          gorunenUrunler.map((urun, index) => (
            <Urunkartı key={index} urun={urun} />
          ))
        )}
      </div>
    </section>
  );
};

export default Urunler;
