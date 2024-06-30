import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Urunkartı from './Urunkarti';
import '../css/UrunDetay.css';

function UrunDetay() {
  const { urunId } = useParams();
  const [urun, setUrun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUrunler = async () => {
      try {
        const response = await axios.get('/${urunId}')
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchUrunler();
  }, [urunId]);


  const handleAddToCart = () => {
    // Sepete ekleme işlemleri burada gerçekleştirilecek
    console.log('Ürün sepete eklendi: ${urun.name}');
    // Örnek olarak konsola eklemeyi simule ediyoruz
  };

  if (loading) return <p>Yükleniyor</p>;
  if (error) return <p>Hata:{error.message}</p>;

  return (
    <div className="urun-detay">
      <h1>Ürün Detayları</h1>
      <hr />
      {urun ? (
        <>
          <Urunkartı urun={urun} />
          <button type="submit" onClick={() => handleAddToCart}>
            Sepete Ekle
          </button>
        </>
      ) : (
        <p>Ürün bulunamadı.</p>
      )}

    </div>
  );
}

export default UrunDetay;


//import React, { useState,useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import '../UrunDetay.css';

// // Resimleri içe aktarın
// import Arka_Kapı_Gergisi from '../Urunler/Arka_Kapı_Gergisi.png';
// import On_Panel from '../Urunler/On_Panel.png';
// import Yag_Filtresi from '../Urunler/Yag_Filtresi.png';
// import Sis_Farı_Lambası from '../Urunler/Sis_Farı_Lambası.png';

// const initialUrunData = {
//   1: {
//     name: 'Arka Kapı Gergisi',
//     image: Arka_Kapı_Gergisi,
//     description: 'Arka kapı için gergi.',
//     price: 200
//   },
//   2: {
//     name: 'Ön Panel',
//     image: On_Panel,
//     description: 'Ön panel için açıklama.',
//     price: 500
//   },
//   3: {
//     name: 'Yağ Filtresi',
//     image: Yag_Filtresi,
//     description: 'Yağ filtresi açıklaması.',
//     price: 800
//   },
//   4: {
//     name: 'Sis Farı Lambası',
//     image: Sis_Farı_Lambası,
//     description: 'Sis farı lambası açıklaması.',
//     price: 400
//   },
// };

// function UrunDetay() {
//   const { urunId } = useParams();
//   const navigate = useNavigate();
//   const [urun, setUrun] = useState(null);
//   const [sepet, setSepet] = useState([]);

//   const handleAddToCart = (urun) => {
//     console.log(`${urun.name} sepete eklendi.`);
//     setSepet([...sepet, urun]);
//     // Sepet sayfasına yönlendir
//     navigate('/sepet');
//   };

//   const handlePrevNext = (direction) => {
//     const currentId = parseInt(urunId);
//     const newId = direction === 'prev' ? currentId - 1 : currentId + 1;
//     if (newId > 0 && newId <= Object.keys(initialUrunData).length) {
//       navigate(`/urun/${newId}`);
//     }
//   };

//   useEffect(() => {
//     const urunData = initialUrunData[urunId];
//     setUrun(urunData);
//   }, [urunId]);

//   if (!urun) {
//     return <div>Ürün bulunamadı...</div>;
//   }

//   return (
//     <div className="urun-detay-container">
//       <div className="urun-detay">
//         <button
//           className="prev-button"
//           onClick={() => handlePrevNext('prev')}
//           disabled={parseInt(urunId) === 1}
//         >
//           &larr; Önceki
//         </button>
//         <div className='urun-detay-sol'>
//           <img src={urun.image} alt={urun.name} />
//         </div>
//         <div className='urun-detay-sag'>
//           <h2>{urun.name}</h2>
//           <p>{urun.description}</p>
//           <p>Fiyat: {urun.price.toFixed(2)} TL</p>
//           <button type="button" onClick={() => handleAddToCart(urun)}>
//             Sepete Ekle
//           </button>
//         </div>
//         <button
//           className="next-button"
//           onClick={() => handlePrevNext('next')}
//           disabled={parseInt(urunId) === Object.keys(initialUrunData).length}
//         >
//           Sonraki &rarr;
//         </button>
//       </div>
//     </div>
//   );
// }

// export default UrunDetay;