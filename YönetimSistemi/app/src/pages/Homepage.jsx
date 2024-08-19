import React,{useEffect, useState}from 'react'
import '../css/Homepage.css'
import logo from '../logolar/eltagronlogo.png'
import 'leaflet/dist/leaflet.css'
import {FaBars} from 'react-icons/fa'
import ProjectCard from '../components/ProjectCard'
import Login from './Login'
import DeviceDefinition from '../pages/DeviceDefinition'
import UserDefinition from '../pages/UserDefinition'
function Homepage() {

   const[menuOpen,setMenuOpen]=useState(false);//menu durumunu tutar
  const[projects,setProjects]=useState([]);
  const[currentPage,setCurrentPage]=useState(1);
  const projectPerPage = 2; // Sayfa başına gösterilecek proje sayısı
  
   //menu durumunu değiştiren fonksiyon
   const toggleMenu=()=>{
    setMenuOpen(!menuOpen);
   }
 
//Json dosyasından veri çekme
// useEffect(() => {
//   fetch('/project.json')
//     .then((response) => response.json())
//     .then((data) => setProjects(data))
//     .catch((error) => console.error('There was a problem with the fetch operation:', error));
// }, []);

// sayfalama fonksiyonu

const indexOfLastProject = currentPage * projectPerPage;
  const indexOfFirstProject = indexOfLastProject - projectPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(projects.length / projectPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <div className='home'>
        <header className='homeHeader' >
            <div className='homeMenu' onClick={toggleMenu}>
                <FaBars/>
            </div>
            <img className='homeLogo' src={logo} alt=" " />
            {menuOpen &&(
                <nav className='menu'>
                  <ul >
                    {/* href kısımlarına backendeki yollar eklenecek */}
              <li ><a  href='/Login'>Giriş</a></li> 
              <li><a href='/DeviceDefinition' >Cihaz Tanımlama</a></li>
              <li><a  href='/UserDefinition'>Kullanıcı Tanımlama</a></li>
              <li><a href='/menu4'>menu4</a></li>
              <li><a href='/menu5'>menu5</a></li>
                    </ul>
                </nav>
            )
            }
            
        </header>

        <div className='homeBody'>
          {
            currentProjects.map((project)=>(
                <ProjectCard
                key={project.isim}
                 isim={project.isim}
                 resim={project.resim}
                 aktifkullanici={project.aktifkullanici}
                 kullanilancihaz={project.kullanilancihaz}
                 url={project.url}
                />
            ))
          } 
        </div>

  {/* Sayfa değiştirme butonları */}
  <div className='pagination'>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Önceki</button>
        <span className='page-number'>Sayfa {currentPage}/{totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Sonraki</button>
      
      </div>
    </div>
  )
}

export default Homepage