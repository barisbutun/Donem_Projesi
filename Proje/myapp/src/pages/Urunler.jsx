import React, { useState, useEffect } from 'react';
import Urunkartı from './Urunkarti';
import axios from 'axios';
import '../css/Urunler.css';

const Urunler = () => {
  const [urunlerDizisi, setUrunlerDizisi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sayfa, setSayfa] = useState(1);
  const [resimSayisi, setResimSayisi] = useState(10);

  useEffect(() => {
    const fetchUrunler = async () => {
      try {
        const response = await axios.get('https://localhost:7242/api/product/All_Prodcut');
        setUrunlerDizisi(response.data);
        setLoading(false);
      }
      catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchUrunler();
  }, []);

  const handleSayfaDegistir = (yeniSayfa) => {
    if (yeniSayfa > 0 && yeniSayfa <= Math.ceil(urunlerDizisi.length / resimSayisi)) {
      setSayfa(yeniSayfa);
    }
  };

  const handleResimSayisiDegistir = (yeniResimSayisi) => {
    const maxSayfaSayisi = Math.ceil(urunlerDizisi.length / yeniResimSayisi);
    if (sayfa > maxSayfaSayisi) {
      setSayfa(maxSayfaSayisi);
    }
    setResimSayisi(yeniResimSayisi);
  };

  const baslangicIndeks = (sayfa - 1) * resimSayisi;
  const bitisIndeks = baslangicIndeks + resimSayisi;
  const gorunenUrunler = urunlerDizisi.slice(baslangicIndeks, bitisIndeks);
  if (loading) return <p>Yükleniyor</p>;
  if (error) return <p>Hata:{error.message}</p>;

  return (
    <section className="urunSayfasi">
      <div className='urunGrid'>
        {gorunenUrunler.length === 0 ? (
          <p>Yükleniyor...</p>
        ) : (
          urunlerDizisi && urunlerDizisi.map((urun) => (
            <Urunkartı key={urun.id} urun={urun} />
          ))
        )}
      </div>

      <footer>
        <div className="sayfalama">
          <button onClick={() => handleSayfaDegistir(sayfa - 1)} disabled={sayfa === 1}>Önceki</button>
          <span>{sayfa} / {Math.ceil(urunlerDizisi.length / resimSayisi)}</span>
          <button onClick={() => handleSayfaDegistir(sayfa + 1)} disabled={sayfa === Math.ceil(urunlerDizisi.length / resimSayisi)}>Sonraki</button>
        </div>

        <div className="resimSayisiKontrol">
          <select value={resimSayisi} onChange={(e) => handleResimSayisiDegistir(parseInt(e.target.value))}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </div>
      </footer>

    </section>
  );
};

export default Urunler;