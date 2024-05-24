import React,{useState} from 'react'
import { Navigate, useNavigation } from 'react-router';
const SifreSıfırlama=async(event)=> {
    event.preventDefault();
    try {
        const response = await fetch('/api/password-reset-verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, token }),
          });
    
          if (!response.ok) {
            throw new Error('Bağlantı geçersiz veya süresi dolmuş.');
        }

        setIsPasswordResetSuccess(true);
        setErrorMessage('');
        Navigate('/LoginKayıt');
        } catch (error) {
            setErrorMessage(error.message);
    }
  return (
    <div className='Sifre'>
          <div className='container'>
         <h1>Şifre Yenileme</h1>
      {isPasswordResetSuccess ? (
        <div>
          <p>Şifreniz başarıyla sıfırlandı.</p>
          <p>Lütfen yeni şifrenizle giriş yapın.</p>
        </div>
      ) : (
        <form >
          <input type="text" className='baglantikod' placeholder='lütfen bağlantı kodunu girin' value={token} onChange={(event) => setToken(event.target.value)} required />
          <label htmlFor='yeniSifre'> Yeni Şifre:</label>
          <input type='password' className='yenisifre' placeholder='Yeni şifrenizi girin.'> </input>
          <button  className=" buton" type="submit" onSubmit={handleSubmit}>Şifreyi Sıfırla</button>
        </form>
      )}
      {errorMessage && <p className="error">{errorMessage}</p>}
      
    </div>
    </div>
  
  )
}

export default SifreSıfırlama
