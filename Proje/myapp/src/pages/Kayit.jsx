import React, { useState } from "react";
// import { setIsKayitFormVisible } from "../App.jsx";
// import{Transition}from "react-transition-group";
function Kayit({ onShowLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sifre: "",
    telefon: "",
  });
  const [errorMessage, setErrorMessage] = useState(null); // Hata mesajı için state

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
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.sifre === "" ||
      formData.telefon === ""
    ) {
      hata = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      hata = true;
    }

    if (hata) {
      alert("Tüm alanları doldurmanız ve geçerli bir e-posta girmeniz gerekmektedir.");
    } else {
      // **Sunucuya veri gönderme işlemini buraya ekleyin**

      // Örnek: Fetch API kullanarak veri gönderme

      const data = {
        name: formData.name,
        email: formData.email,
        sifre: formData.sifre,
        telefon: formData.telefon,
      };

      fetch("/api/kayit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.success) {
            // Kayıt işlemi sonrası yapılacak işlemleri buraya ekleyin
            // Örneğin:
            // - Kullanıcıyı ana sayfaya yönlendirin.
            // - Başarılı kayıt mesajı gösterin.
            console.log("Kayıt işlemi başarılı!");
            alert("Kayıt işlemi başarıyla tamamlandı!");
            // ...
          } else {
            // Hata mesajı gösterin
            console.log("Kayıt işlemi başarısız!");
            setErrorMessage(responseData.error); // Hata mesajını state'e ekleyin
          }
        });

      // **Sunucuya veri gönderme işleminin sonu**
    }
  };

  return (
    <div className="kayit-modal">
      <div className="containerKayit">
        <h1 className="baslıkKayit">Kayıt Ol</h1>
        <form onSubmit={handleSubmit}>
          <div className="isim">
            <label htmlFor="isim">Adı:</label>
            <input
              type="text"
              id="isim"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Adınızı girin"
              required
            />
          </div>

          <div className="email">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Emailinizi girin"
              required
            />
          </div>

          <div className="sifre">
            <label htmlFor="sifre">Şifre:</label>
            <input
              type="password"
              id="sifre"
              name="sifre"
              value={formData.sifre}
              onChange={handleChange}
              placeholder="Şifrenizi girin"
              required
            />
          </div>

          <div className="telefon">
            <label htmlFor="telefon">Telefon Numarası:</label>
            <input
              type="text"
              id="telefon"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              placeholder="Telefon numaranızı girin"
              required
            />
          </div>

          {errorMessage && <p className="hata-mesajı">{errorMessage}</p>}

            <button type="submit" className="buttonKayit">
              Kaydol
            </button>
         
        </form>
      </div>
    </div>
  );
}

export default Kayit;
