import React, { useState, useEffect } from 'react';
import UrunKartı from './Urunkartı';

const Urunler = () => {
  const [ürünler, setÜrünler] = useState([]);

  useEffect(() => {
    const ürünlerDizisi = [];
    const ürünlerContext = require.context('../Urunler', true, /\.(png|jpg|jpeg)$/i);

    ürünlerContext.keys().forEach((dosyaYolu) => {
      const dosyaAdı = dosyaYolu.slice(2);
      const ürünAdı = dosyaAdı.slice(0, -4);

      ürünlerDizisi.push({
        resim: dosyaAdı,
        urunAdı: ürünAdı,
        // ... diğer ürün bilgileri
      });
    });

    setÜrünler(ürünlerDizisi);
  }, []);

  if (!ürünler.length) {
    return <div>Ürünler yükleniyor...</div>;
  }

  return (
    <section className="urunSayfasi">
        <div className='urunGrid'> 
      {ürünler.map((ürün) => (
        <UrunKartı key={ürün.resim} {...ürün} />
      ))}
      </div>
    </section>
  );
};

export default Urunler;
