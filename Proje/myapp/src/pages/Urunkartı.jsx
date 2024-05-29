import React, { useEffect, useState } from 'react';
import '../UrunKarti.css';
import { Link } from 'react-router-dom';

const Urunkartı = ({ urunId }) => {
  const [urun, setUrun] = useState(null);

  useEffect(() => {
    const fetchUrun = async () => {
      try {
        const response = await fetch(`[API URL'si]/${urunId}`);
        const data = await response.json();
        setUrun(data);
      } catch (error) {
        console.error('Ürün getirilirken bir hata oluştu:', error);
      }
    };

    fetchUrun();
  }, [urunId]);

  if (!urun) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="urunKartı">
      <img src={urun.resim} alt={urun.Parca_Adi} />
      <h5>{urun.Parca_Adi}</h5>
      <p>{urun.bolgeId}</p>
      <p>{urun.Fiyat} TL</p>
      <p>{urun.Acıklama}</p>
      <p>Marka: {urun.Marka_Adi}</p>
      <p>Adet: {urun.Adet_Sayisi}</p>
      <Link to={`/urun/${urun.UrunId}`}>İncele</Link>
    </div>
  );
};

export default Urunkartı;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../UrunKarti.css';

// const Urunkartı = ({ urun }) => {
//   if (!urun) {
//     return <div>Yükleniyor...</div>;
//   }

//   return (
//     <div className="urunKartı">
//       <img src={urun.resim} alt={urun.urunAdı} />
//       <h3>{urun.urunAdı}</h3>
//       <p>{urun.Fiyat} TL</p>
//       <p>{urun.Acıklama}</p>
//       <Link to={`/urun/${urun.urunId}`} className="detay-button">Detaylara Git</Link>
//     </div>
//   );
// };

// export default Urunkartı;