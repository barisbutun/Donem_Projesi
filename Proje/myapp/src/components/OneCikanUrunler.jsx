import React from 'react';

function OneCikanUrunler({ urunler }) {
  return (
    <section className="one-cikan-urunler">
      <h2>Öne Çıkan Ürünler</h2>
      <ul>
        {urunler.map((urun) => (
          <li key={urun.id}>
            <a href="#">
              <img src={urun.resimUrl} alt={urun.adi} />
              <p>{urun.adi}</p>
              <span>{urun.fiyat} ₺</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default OneCikanUrunler;