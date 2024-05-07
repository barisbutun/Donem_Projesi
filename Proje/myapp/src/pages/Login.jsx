import React, { useState } from "react";



function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    sifre: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hata = false;
    if (formData.email === "" || formData.sifre === "") {
      hata = true;
    }

    if (hata) {
      alert("Boşlukları doldurun");
    } else {
      onLogin(formData); 
    }
  };


  return (
    <div className="login">
      <div className="container">
        <h1 className="baslık">Giriş Yap</h1>
        <form onSubmit={handleSubmit}>
          <div className="username">
            <input
              type="email"
              placeholder="E-posta Adresi"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
            />
          </div>

          <div className="password">
            <input
              type="password"
              placeholder="Şifre"
              value={formData.sifre}
              onChange={handleChange}
              name="sifre"
              required
            />
          </div>

          <button className="buttonGiris" type="submit">Giriş Yap</button>
          <a href="/">Şifrenizi mi unuttunuz?</a>
          {/* Removed "Kaydol" button and `onShowKayit` reference */}
        </form>
      </div>
    </div>
  );
}

export default Login;
