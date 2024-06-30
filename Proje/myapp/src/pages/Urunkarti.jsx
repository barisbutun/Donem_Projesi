// import React, { useEffect, useState } from 'react';
// import '../UrunKarti.css';
// import { Link } from 'react-router-dom';

// const Urunkartı = ({ urunId }) => {
//   const [urun, setUrun] = useState(null);

//   useEffect(() => {
//     const fetchUrun = async () => {
//       try {
//         const response = await fetch(`https://localhost:7242/api/product/${urunId}`);
//         const data = await response.json();
//         setUrun(data);
//       } catch (error) {
//         console.error('Ürün getirilirken bir hata oluştu:', error);
//       }
//     };

//     fetchUrun();
//   }, [urunId]);

//   if (!urun) {
//     return <div>Yükleniyor...</div>;
//   }

//   return (
//     <div className="urunKartı">
//       <img src={urun.resim} alt={urun.Parca_Adi} />
//       <h5>{urun.Parca_Adi}</h5>
//       <p>{urun.bolgeId}</p>
//       <p>{urun.Fiyat} TL</p>
//       <p>{urun.Acıklama}</p>
//       <p>Marka: {urun.Marka_Adi}</p>
//       <p>Adet: {urun.Adet_Sayisi}</p>
//       <Link to={`/urun/${urun.UrunId}`}>İncele</Link>
//     </div>
//   );
// };

// export default Urunkartı;


import React from 'react';
import { Link } from 'react-router-dom';
import '../css/UrunKarti.css';

const Urunkartı = ({ urun }) => {
  if (!urun) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="urunKartı">
      <img src={"/Urunler/"+urun.urunID+".png"} alt={urun.Parca_Adi} />
      <h5>{urun.parca_Adi}</h5>
       <p>{urun.bolgeId}</p>
       <p>{urun.price} TL</p>
       <p>{urun.Acıklama}</p>
       <p>Marka: {urun.marka_Adi}</p>
        <p>Adet: {urun.adet_Sayisi}</p>
      <Link to={`/urun/${urun.urunId}`} className="detay-button">Detaylara Git</Link>
    </div>
  );
};

export default Urunkartı;