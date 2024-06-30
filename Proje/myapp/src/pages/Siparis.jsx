import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Siparis.css';

function Siparis() {
  const location = useLocation();
  const { order } = location.state || { order: {} };

  return (
    <div className="siparis-listesi">
      <h1>Sipariş Detayları</h1>
      {order.items && order.items.length > 0 ? (
        <div>
          <p><strong>Sipariş ID:</strong> {order.SiparisId}</p>
          <p><strong>Bölge ID:</strong> {order.BolgeId}</p>
          <table className="table">
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Fiyat</th>
                <th>Adet</th>
                <th>Toplam</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.urunler.urunId}>
                  <td>{item.urunler.name}</td>
                  <td>{item.urunler.price.toFixed(2)} TL</td>
                  <td>{item.quantity}</td>
                  <td>{(item.urunler.price * item.quantity).toFixed(2)} TL</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="order-summary">
            <h2>Toplam: {order.total.toFixed(2)} TL</h2>
          </div>
        </div>
      ) : (
        <div>Sipariş bulunmamaktadır.</div>
      )}
    </div>
  );
}

export default Siparis;



// import React from 'react';
