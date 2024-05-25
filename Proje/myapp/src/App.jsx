import React, { useState } from 'react';
import LoginKayıt from './pages/LoginKayıt';
import Anasayfa from './pages/Anasayfa';
import Urunler from './pages/Urunler';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SifreYenileme from './pages/SifreYenileme';
import Sepetim from './pages/Sepetim';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Anasayfa />} />
        <Route path='/LoginKayıt' element={<LoginKayıt />} />
        <Route path='/Urunler' element={<Urunler/>}/>
        <Route path='/SifreYenileme' element={<SifreYenileme/>}/>
        <Route path='/Sepetim' element={<Sepetim/>}></Route>
      </Routes>
    </Router>
      
  );
}

export default App;
