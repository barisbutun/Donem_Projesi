import React, { useState } from 'react';
import Login from './pages/Login';
import Kayit from './pages/Kayit';
import Anasayfa from './pages/Anasayfa';
import Urunler from './pages/Urunler';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Anasayfa />} />
        <Route path='/Kayit' element={<Kayit/>} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Urunler' element={<Urunler/>}/>
      </Routes>
    </Router>
  );
}

export default App;
