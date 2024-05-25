import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Sepetim({ urun = [] }) {
  const [urunState, setUrunState] = useState(urun);

  const handleAddToCart = (urun) => {
    const existingProductIndex = urunState.findIndex((item) => item.id === urun.id);
     
    if (existingProductIndex !== -1) {
      const updatedCartItems = [...urunState];
      updatedCartItems[existingProductIndex].quantity++;
      setUrunState(updatedCartItems);
    } else {
      setUrunState([...urunState, { ...urun, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (urun) => {
    setUrunState(urunState.filter((item) => item.id !== urun.id));
  };

  const handleUpdateCartQuantity = (urun, quantity) => {
    setUrunState(
      urunState.map((item) => {
        if (item.id === urun.id) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const getSubtotal = () => {
    return urunState.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getShippingCost = () => {
    return 5; // Örnek: 5 TL sabit nakliye ücreti
  };

  const getTax = () => {
    return getSubtotal() * 0.08; // Örnek: Ara toplamın %8'i vergi
  };

  const getTotal = () => {
    return getSubtotal() + getShippingCost() + getTax();
  };

  const handleCheckout = () => {
    console.log("Ödeme işlemine geçiliyor...");
  };

  return (
    <div>
      <h1>Sepetiniz</h1>
      {urunState.length === 0 ? (
        <div>Sepetinizde ürün bulunmamaktadır.</div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Fiyat</th>
                <th>Adet</th>
                <th>Toplam</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {urunState.map((urun) => (
                <tr key={urun.id}>
                  <td>{urun.name}</td>
                  <td>{urun.price.toFixed(2)} TL</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={urun.quantity}
                      onChange={(event) =>
                        handleUpdateCartQuantity(urun, parseInt(event.target.value))
                      }
                    />
                  </td>
                  <td>{(urun.price * urun.quantity).toFixed(2)} TL</td>
                  <td>
                    <button onClick={() => handleRemoveFromCart(urun)}>Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <p>Ara Toplam: {getSubtotal().toFixed(2)} TL</p>
            <p>Kargo Ücreti: {getShippingCost().toFixed(2)} TL</p>
            <p>Vergi: {getTax().toFixed(2)} TL</p>
            <h2>Toplam: {getTotal().toFixed(2)} TL</h2>
            <button onClick={() => handleCheckout()}>Ödeme Yap</button>
          </div>
        </div>
      )}
    </div>
  );
}

Sepetim.propTypes = {
  urun: PropTypes.array,
};

export default Sepetim;
