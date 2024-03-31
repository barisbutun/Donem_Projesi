import React, { useState} from 'react';
// import { Link } from 'react-router-dom';
import Kayit from './Kayit';
function Giris() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Kullanıcı adı:', username);
      console.log('Şifre:', password);
    };
    const[kaydol,setKaydol]=useState(false);
    const handleKaydolClick=()=>{
      setKaydol(true);
    }

    if(kaydol){
      return <Kayit/>
    }
    else{
      return (
        <body className='body'>
           <div className='container'>
          <h1 className='baslık'>Giriş Yap</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className='user'>
              <label htmlFor="username">Kullanıcı Adı:</label> 
               <input
                type="text"
                id='username'
                value={username}
                onChange={handleUsernameChange}
                placeholder='Kullanıci adınızı girin'
                required
              />
            </div>
    
            <div className='password'>
              <label htmlFor="password">Şifre:</label>        
              <input
                type="password"
                id='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder='Şifrenizi girin'
                required
              />
            </div>
            <div className='button'>
              <button type='submit'>Giriş Yap</button>
             <button onClick={handleKaydolClick} type='submit'>Kaydol</button> 
              <a href="/">Şifrenizi mi unuttunuz?</a>
              <button type='submit'>Giriş yapmadan devam et</button>
            
             
            </div>
          </form>
        </div>
        </body>
       
      )
    }
  
  
};
export default Giris




 
  