import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/UrunKarti.css';
import Urunkarti from './Urunkarti'; 

const categories = [
    { bolgeId: 1, name: 'Motor' },
    { bolgeId: 2, name: 'Fren Sistem' },
    { bolgeId: 3, name: 'Direksiyon Sistemi' },
    { bolgeId: 4, name: 'Süspansiyon Sistemi' },
    { bolgeId: 5, name: 'Elektrik Sistemi' },
    { bolgeId: 6, name: 'Transmisyon Sistemi' },
    { bolgeId: 7, name: 'Egzoz Sistemi' },
    { bolgeId: 8, name: 'Soğutma Sistemi' },
    { bolgeId: 9, name: 'Yakıt Sistemi' },
    { bolgeId: 10, name: 'Kaporta' },
    { bolgeId: 11, name: 'İç Mekan' },
    { bolgeId: 12, name: 'Güvenlik Sistemleri' },
    { bolgeId: 13, name: 'Diğer' },
];

const Filtrele = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // API'den ürünleri çek
        axios.get('https://api.example.com/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Ürünler çekilirken bir hata oluştu:", error);
            });
    }, []);



    const handleCategoryClick = (bolgeIds) => {
        const selectedCategories = categories.filter(category => bolgeIds.includes(category.bolgeId));
        const selectedCategoryNames = selectedCategories.map(category => category.name);

        const filtered = products.filter(product => selectedCategoryNames.includes(product.category));
        setFilteredProducts(filtered);
    };

    return (
        <div className='Filtrele'>

            <div className='filtrele-header'>
                <h2>Aracınızın hangi bölgeden hasar aldığını seçebilir misiniz?</h2>
            </div>

            <div className='sag'>
                <button id='buton8' onClick={() => handleCategoryClick([10, 1, 4])}>8</button>{/* SağÖnÇamurluk */}
                <button id='buton9' onClick={() => handleCategoryClick([10, 2, 11])}>9</button>{/* SağÖnKapı */}
                <button id='buton10' onClick={() => handleCategoryClick([10, 3, 11])}>10</button>{/* SağArkaKapı */}
                <button id='buton11' onClick={() => handleCategoryClick([10, 4])}>11</button>{/* SağArkaÇamurluk */}
            </div>

            <div className='ust'>
                <button id='buton12' onClick={() => handleCategoryClick([10, 5])}>12</button>{/* ÖnTampon */}
                <button id='buton1' onClick={() => handleCategoryClick([1, 6, 8])}>1</button>{/* MotorKaputu */}
                <button id='buton2' onClick={() => handleCategoryClick([7, 9, 12])}>2</button>{/* Tavan */}
                <button id='buton3' onClick={() => handleCategoryClick([10, 8])}>3</button>{/* BagajKapağı */}
                <button id='buton13' onClick={() => handleCategoryClick([10, 9])}>13</button>{/* ArkaTampon */}
            </div>

            <div className='sol'>
                <button id='buton4' onClick={() => handleCategoryClick([10, 1, 4])}>4</button>{/* SolÖnÇamurluk */}
                <button id='buton5' onClick={() => handleCategoryClick([10, 2, 11])}>5</button>{/* SolÖnKapı */}
                <button id='buton6' onClick={() => handleCategoryClick([10, 3, 11])}>6</button>{/* SolArkaKapı */}
                <button id='buton7' onClick={() => handleCategoryClick([10, 4])}>7</button>{/* SolArkaÇamurluk */}
            </div>

            <div className='data-container'>
                {filteredProducts.map((urun) => (
                  <Urunkarti key={urun.id} urun={urun}/>                    
                ))}
            </div>
        </div>
    );
};

export default Filtrele;