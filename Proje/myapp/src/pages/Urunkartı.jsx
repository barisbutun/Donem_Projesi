import React from 'react';
import '../UrunKarti.css';
const Urunkartı = ({ ürün }) => {
  if(!ürün){
    return <div>Yükleniyor...</div>;
  }
  return (
    <div className="urunKartı">
      <img src={ürün.resim} alt={ürün.urunAdı} />
      <h3>{ürün.urunAdı}</h3>
      <p>{ürün.Fiyat} TL</p>
      <p>{ürün.Acıklama}</p>
    </div>
  );
};

export default Urunkartı;