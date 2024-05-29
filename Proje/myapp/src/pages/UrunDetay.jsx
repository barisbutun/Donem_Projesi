import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import images from '../utils/images'; // Resimleri içe aktarıyoruz
import '../UrunDetay.css';

function UrunDetay() {
  const { urunId } = useParams();
  const navigate = useNavigate();
  const [urun, setUrun] = useState(null);

  useEffect(() => {
    const fetchUrun = async () => {
      try {
        const response = await fetch(`/api/urunler/${urunId}`); // API URL'sini uygun şekilde güncelleyin
        if (!response.ok) {
          throw new Error('Ürün bulunamadı.');
        }
        const data = await response.json();
        data.image = images[urunId]; // Resmi data'ya ekliyoruz
        setUrun(data);
      } catch (error) {
        console.error('Hata:', error.message);
      }
    };

    fetchUrun();
  }, [urunId]);

  const handleAddToCart = (urun) => {
    console.log(`${urun.Parca_Adi} sepete eklendi.`);
    // Sepete eklenen ürünü localStorage'e ekle
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, urun];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    // Sepet sayfasına yönlendir
    navigate('/Sepetim');
  };

  const handlePrevNext = (direction) => {
    const currentId = parseInt(urunId);
    const newId = direction === 'prev' ? currentId - 1 : currentId + 1;
    if (newId > 0 && newId <= Object.keys(images).length) {
      navigate(`/urun/${newId}`);
    }
  };

  if (!urun) {
    return <div>Ürün bilgileri yükleniyor...</div>;
  }

  return (
    <div className="urun-detay-container">
      <div className="urun-detay">
        <button
          className="prev-button"
          onClick={() => handlePrevNext('prev')}
          disabled={parseInt(urunId) === 1}
        >
          &larr; Önceki
        </button>
        <div className='urun-detay-sol'>
          <img src={urun.image} alt={urun.Parca_Adi} />
        </div>
        <div className='urun-detay-sag'>
          <h2>{urun.Parca_Adi}</h2>
          <p>{urun.Acıklama}</p>
          <p>Fiyat: {urun.Fiyat.toFixed(2)} TL</p>
          <button type="button" onClick={() => handleAddToCart(urun)}>
            Sepete Ekle
          </button>
        </div>
        <button
          className="next-button"
          onClick={() => handlePrevNext('next')}
          disabled={parseInt(urunId) === Object.keys(images).length}
        >
          Sonraki &rarr;
        </button>
      </div>
    </div>
  );
}

export default UrunDetay;
