import React from 'react';
// Importamos Avatar
import Avatar from '../avatar/Avatar'
// Importamos Link de react-router-dom
import { Link } from 'react-router-dom';
import './ProjectList.css';

// Hay que transformar el timestamp de Firebase a una fecha y esa fecha a un string
export const ProjectList = ({projects}) => {
	return (
		<div className='project-list'>
            {projects.length === 0 && <p>No projects yet</p>}
			{projects.map(project => <Link key={project.id} to={`/projects/${project.id}`}>
                <h4>
                    {project.name}
                </h4>
                <p>
                    Due by: {project.dueDate.toDate().toDateString()}
                </p>
                <div className='assigned-to'>Assigned to: 
                    <ul>
                        {project.assignedUsersList.map(user => (
                            <li key={user.photoURL}>
                                <Avatar src={user.photoURL}/>
                            </li>
                        ))}
                    </ul>
                 </div>
            </Link>)}
		</div>
	);
};
