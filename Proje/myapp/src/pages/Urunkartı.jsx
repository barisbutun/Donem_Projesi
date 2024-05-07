import React from 'react';

const Urunkartı = ({ resim, urunAdı, Fiyat, Acıklama }) => {
  return (
    <div className="urun-karti">
      <img src={(`/Proje/myapp/src/Urunler${resim}`)} alt={urunAdı} />
      <h3>{urunAdı}</h3>
      <p>{Fiyat} TL</p>
      <p>{Acıklama}</p>
    </div>
  );
};

export default Urunkartı;