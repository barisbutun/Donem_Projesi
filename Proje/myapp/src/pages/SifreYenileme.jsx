import React, { useState } from 'react'
import '../SifreYenileme.css';
// import { json } from 'react-router';

const SifreYenileme = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try { 
            const response = await fetch('/api/sifreyenileme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                throw new Error('Sifre sıfırlama bağlantısı gönderilemedi');
            }

            setErrorMessage('');
            alert('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');

        } catch (error) {
            setErrorMessage(error.message);
        }
    }
    return (
        <div className='Sifre'>
            <div className='container'>
                <h1>Şifre Yenileme</h1>
                <label htmlFor="email">E-posta Adresi:</label>
                <input type="email" className="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                <button className='buton' type="submit" onSubmit={handleSubmit}>Şifre Sıfırlama Bağlantısı Gönder</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
        </div>

    );
};

export default SifreYenileme;
