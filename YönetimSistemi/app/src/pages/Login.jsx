import React, { useEffect, useState } from 'react'
import '../css/Login.css'
import logo from '../logolar/eltagronlogo.png'
// import {useNavigate} from 'react-router-dom'
function Login() {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
   const[users,setUsers]=useState([]);
  //  const navigate=useNavigate();
//    //kullanıcı verilerini yükleme
//   useEffect(()=>{
//     fetch('/users.json')
//     .then(response=>response.json())
//     .then((data)=>setUsers(data))
//     .catch(error=>console.error('error fetching user data:',error));
//   },[]);
    const handleSubmit=(event)=>{
      event.preventDefault();
//kullanıcı adı şifre doğrulama
      const user=users.find(user=>user.username===username && user.password===password)
      //başarılı giriş
      if(user){
        // navigate('/Homepage');
      }
      
      else{
        alert('Geçersiz kullanıcı adı veya şifre');
      }
    }
    
  return (
    <div className='login'>
  
   <img src={logo} alt='' /> 
        <h1>ADMİN GİRİS</h1> 
   <input 
    type="email" 
    name='email'
    placeholder='emailinizi giriniz' 
    value={username}
    onChange={(e)=>setUsername(e.target.value)}
    required
    />
   

   <input 
    type="password" 
    name='sifre'
    placeholder='sifrenizi giriniz' 
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    required
    />
  

   <button type='submit' onClick={handleSubmit}>Giriş Yap</button>
   
 
    </div>
    
  )
}

export default Login