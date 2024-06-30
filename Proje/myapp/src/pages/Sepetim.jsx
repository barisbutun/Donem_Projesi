import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/Sepetim.css';

function Sepetim() {
  const [urunState, setUrunState] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(''); // API URl sini yazacaksın ürünleri çekmek için
        setUrunState(response.data);
      } catch (error) {
        console.error('Ürünler çekilirken hata oluştu:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (urun) => {
    const existingProductIndex = cartItems.findIndex((item) => item.urunler.urunId === urun.urunId);

    if (existingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { urunler: urun, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (urun) => {
    setCartItems(cartItems.filter((item) => item.urunler.urunId !== urun.urunId));
  };

  const handleUpdateCartQuantity = (urun, quantity) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.urunler.urunId === urun.urunId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.urunler.price * item.quantity, 0);
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
    const newOrder = {
      id: new Date().getTime(), // Siparişe benzersiz bir ID atama
      items: cartItems,
      total: getTotal()
    };
    alert('Ödemeniz başarılı bir şekilde gerçekleşti.')
    navigate('/Siparis', { state: { order: newOrder } });
  };

  return (
    <div className='SepetContainer'>
      <h1>Sepetiniz</h1>
      {cartItems.length === 0 ? (
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
              {cartItems.map((urun) => (
                <tr key={urun.urunler.urunId}>
                  <td>{urun.urunler.name}</td>
                  <td>{urun.urunler.price.toFixed(2)} TL</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={urun.quantity}
                      onChange={(event) =>
                        handleUpdateCartQuantity(urun.urunler, parseInt(event.target.value))
                      }
                    />
                  </td>
                  <td>{(urun.urunler.price * urun.quantity).toFixed(2)} TL</td>
                  <td>
                    <button onClick={() => handleRemoveFromCart(urun.urunler)}>Sil</button>
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
            <button onClick={handleCheckout}>Ödeme Yap</button>
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


// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import '../Sepetim.css';

// function Sepetim() {
//   const initialCartItems = [
//     {
//       urunler: { urunId: 1, name: 'Ürün 1', price: 50 },
//       quantity: 2
//     },
//     {
//       urunler: { urunId: 2, name: 'Ürün 2', price: 30 },
//       quantity: 1
//     }
//   ];

//   const [urunState, setUrunState] = useState(initialCartItems);
//   const navigate = useNavigate();

//   const handleAddToCart = (urun) => {
//     const existingProductIndex = urunState.findIndex((item) => item.urunler.urunId === urun.urunler.urunId);

//     if (existingProductIndex !== -1) {
//       const updatedCartItems = [...urunState];
//       updatedCartItems[existingProductIndex].quantity++;
//       setUrunState(updatedCartItems);
//     } else {
//       setUrunState([...urunState, { ...urun, quantity: 1 }]);
//     }
//   };

//   const handleRemoveFromCart = (urun) => {
//     setUrunState(urunState.filter((item) => item.urunler.urunId !== urun.urunler.urunId));
//   };

//   const handleUpdateCartQuantity = (urun, quantity) => {
//     setUrunState(
//       urunState.map((item) => {
//         if (item.urunler.urunId === urun.urunler.urunId) {
//           return { ...item, quantity };
//         }
//         return item;
//       })
//     );
//   };

//   const getSubtotal = () => {
//     return urunState.reduce((total, item) => total + item.urunler.price * item.quantity, 0);
//   };

//   const getShippingCost = () => {
//     return 5; // Örnek: 5 TL sabit nakliye ücreti
//   };

//   const getTax = () => {
//     return getSubtotal() * 0.08; // Örnek: Ara toplamın %8'i vergi
//   };

//   const getTotal = () => {
//     return getSubtotal() + getShippingCost() + getTax();
//   };

//   const handleCheckout = () => {
//     const newOrder = {
//       id: new Date().getTime(), // Siparişe benzersiz bir ID atayın
//       items: urunState,
//       total: getTotal()
//     };
//     navigate('/Siparis', { state: { order: newOrder } });
//   };

//   return (
//     <div className='SepetContainer'>
//       <h1>Sepetiniz</h1>
//       {urunState.length === 0 ? (
//         <div>Sepetinizde ürün bulunmamaktadır.</div>
//       ) : (
//         <div>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Ürün</th>
//                 <th>Fiyat</th>
//                 <th>Adet</th>
//                 <th>Toplam</th>
//                 <th>İşlemler</th>
//               </tr>
//             </thead>
//             <tbody>
//               {urunState.map((urun) => (
//                 <tr key={urun.urunler.urunId}>
//                   <td>{urun.urunler.name}</td>
//                   <td>{urun.urunler.price.toFixed(2)} TL</td>
//                   <td>
//                     <input
//                       type="number"
//                       min="1"
//                       value={urun.quantity}
//                       onChange={(event) =>
//                         handleUpdateCartQuantity(urun, parseInt(event.target.value))
//                       }
//                     />
//                   </td>
//                   <td>{(urun.urunler.price * urun.quantity).toFixed(2)} TL</td>
//                   <td>
//                     <button onClick={() => handleRemoveFromCart(urun)}>Sil</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="cart-summary">
//             <p>Ara Toplam: {getSubtotal().toFixed(2)} TL</p>
//             <p>Kargo Ücreti: {getShippingCost().toFixed(2)} TL</p>
//             <p>Vergi: {getTax().toFixed(2)} TL</p>
//             <h2>Toplam: {getTotal().toFixed(2)} TL</h2>
//             <button onClick={handleCheckout}>Ödeme Yap</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// Sepetim.propTypes = {
//   urun: PropTypes.array,
// };

// export default Sepetim;

