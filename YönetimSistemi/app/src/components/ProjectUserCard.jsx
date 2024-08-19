import React from 'react'
import '../css/ProjectCard.css'
function ProjectUserCard({isim,resim,url,aktifkullanici}) {
  const handleCardClick=()=>{
    window.location.href=url;
  }
  return (
        <div className='projectCard' onClick={handleCardClick}>
        <h3>{isim}</h3>
          <img className=' resim' src={resim}/>
         <p>Aktif kullanıcı:{aktifkullanici}</p>
       </div>
    
  );
}
 
export default ProjectUserCard