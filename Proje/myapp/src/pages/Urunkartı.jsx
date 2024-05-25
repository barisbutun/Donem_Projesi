import React, { useEffect, useState } from 'react';
import '../UrunKarti.css';
import { Link } from 'react-router-dom';

const Urunkartı = ({ urunId }) => {
  const [urun, setUrun] = useState(null);

  useEffect(() => {
    const fetchUrun = async () => {
      const response = await fetch(`[API URL'si}/${urunId}`); // API URL'sini ekleyin
      const data = await response.json();
      setUrun(data);
    };

    fetchUrun();
  }, [urunId]); // useEffect'i urunId'ye bağlı hale getirin

  if (!urun) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="urunKartı">
      <img src={urun.resim} alt={urun.urunAdı} />
      <h5>{urun.urunAdı}</h5>
      <p>{urun.Fiyat} TL</p>
      <p>{urun.Acıklama}</p>
      <Link to={`/urun/${urun.urunId}`}>İncele</Link>
    </div>
  );
};

export default Urunkartı;