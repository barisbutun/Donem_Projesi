import React,{useEffect,useState}from 'react'
import ProjectUserCard from '../components/ProjectUserCard';
function UserDefinition() {
  const[project,setProjects]=useState([]);
  //Json dosyasından veri çekme
useEffect(() => {
  fetch('/project.json')
    .then((response) => response.json())
    .then((data) => setProjects(data))
    .catch((error) => console.error('There was a problem with the fetch operation:', error));
}, []);
return (
  <div>
       {
          project.map((project)=>(
              <ProjectUserCard
              key={project.isim}
               isim={project.isim}
               resim={project.resim}
               aktifkullanici={project.aktifkullanici}
               url={project.url}
              />
          ))
        } 
  </div>
)
}

export default UserDefinition