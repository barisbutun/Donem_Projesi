import React from 'react'
import '../css/ProjectCard.css'
function ProjectCard({isim,resim,aktifkullanici,url,kullanilancihaz}) {
  const handleCardClick=()=>{
    window.location.href=url;
  }
  return (
        <div className='projectCard' onClick={handleCardClick}>
        <h3>{isim}</h3>
          <img className=' resim' src={resim}/>
         <p>Aktif kullanıcı:{aktifkullanici}</p>
         <p>Kullanılan Cihazlar:{kullanilancihaz}</p>
       </div>
    
  );
}
 
export default ProjectCard