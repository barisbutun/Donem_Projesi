import React, { useState, useEffect } from 'react';
import Urunkartı from './Urunkartı';
import '../Urunler.css';

const Urunler = () => {
  const [urunlerDizisi, setUrunlerDizisi] = useState([]); // Ürün dizisi
  const [sayfa, setSayfa] = useState(1); // Aktif sayfa
  const [resimSayisi, setResimSayisi] = useState(10); // Sayfa başına resim sayısı

  // Ürünleri içe aktarma
  useEffect(() => {
    const yeniUrunlerDizisi = [];
    const urunlerContext = require.context('../Urunler', true, /\.(png|jpg|jpeg)$/i);

    urunlerContext.keys().forEach((dosyaYolu) => {
      const resim=urunlerContext(dosyaYolu);
      const dosyaAdı = dosyaYolu.replace('../Urunler',''); // Dosya adını al
      const urunAdı = dosyaAdı.replace(/\.[^/.]+$/, " "); // Ürün adını al

      yeniUrunlerDizisi.push({
        resim:resim,
        urunAdı: urunAdı,
        // ... diğer ürün bilgileri
      });
    });

    setUrunlerDizisi(yeniUrunlerDizisi);
  }, []);

  // Sayfa değiştirme işlevi
  const handleSayfaDegistir = (yeniSayfa) => {
    if (yeniSayfa > 0 && yeniSayfa <= Math.ceil(urunlerDizisi.length / resimSayisi)) {
      setSayfa(yeniSayfa);
    }
  };

  // Resim sayısı değiştirme işlevi
  const handleResimSayisiDegistir = (yeniResimSayisi) => {
    setResimSayisi(yeniResimSayisi);
  };

  // Sayfanın ilk ve son indekslerini hesaplama
  const baslangicIndeks = (sayfa - 1) * resimSayisi;
  const bitisIndeks = baslangicIndeks + resimSayisi;

  // Görünen ürünlerin dizisi
  const gorunenUrunler = urunlerDizisi.slice(baslangicIndeks, bitisIndeks);

  return (
    <section className="urunSayfasi">
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
      {urunlerDizisi.map((ürün,index) => (
       <Urunkartı key={index} urun={ürün}/>
      ))}
      </div>
    </section>
  )
};

export default Urunler;
