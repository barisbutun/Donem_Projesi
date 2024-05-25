import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // URL parametrelerini almak için

function UrunDetay() {
  const { urunId } = useParams(); // URL parametresinden ürün ID'sini al
  const [urun, setUrun] = useState(null); // Seçilen ürünün state'i

  // Ürün verisini (API veya başka bir kaynaktan) yükleme
  useEffect(() => {
    fetch(`https://your-api.com/urunler/${urunId}`) // Örnek API URL'si
      .then((response) => response.json())
      .then((urunData) => setUrun(urunData));
  }, [urunId]); // useEffect'i ürün ID'si değiştiğinde tekrar çalıştır

  if (!urun) {
    return <div>Ürün yükleniyor...</div>;
  }

  return (
    <div className="urun-detay">
      <h2>{urun.name}</h2>
      <img src={urun.image} alt={urun.name} />
      <p>{urun.description}</p>
      <p>Fiyat: {urun.price.toFixed(2)} TL</p>
      <Button type= 'submit'onClick={() => handleAddToCart(urun)}>
        Sepete Ekle
      </Button>
    </div>
  );
}

export default UrunDetay;
