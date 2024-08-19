import React from 'react'
import '../css/ProjectCard.css'
function ProjectDeviceCard({isim,resim,url,kullanilancihaz}) {
  const handleCardClick=()=>{
    window.location.href=url;
  }
  return (
        <div className='projectCard' onClick={handleCardClick}>
        <h3>{isim}</h3>
          <img className=' resim' src={resim}/>
         <p>Kullanılan Cihazlar:{kullanilancihaz}</p>
       </div>
    
  );
}
 
export default ProjectDeviceCard