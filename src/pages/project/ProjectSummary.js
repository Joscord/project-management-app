import React from 'react'
// Importamos el componente Avatar
import Avatar from '../../components/avatar/Avatar';    

// Esperamos recibir el proyecto como prop
export const ProjectSummary = ({project}) => {
  return (
    <div className='project-summary'>
        <h2 className='page-title'>{project.name}</h2>
        <p className='due-date'>
            Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className='details'>
            {project.details}
        </p>
        <h4>Project is assigned to:</h4>
        {project.assignedUsersList.map(user => (
            <div key={user.id}>
                <Avatar src={user.photoURL}/>
            </div>
        ))}
    </div>
  )
}
