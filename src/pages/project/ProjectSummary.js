import React from 'react';
import Avatar from '../../components/avatar/Avatar';
// importamos useFirestore para poder usar la función de borrar documentos
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useHistory } from 'react-router-dom';

export const ProjectSummary = ({ project }) => {
	const { deleteDocument } = useFirestore('projects');
    const { user } = useAuthContext(); 
    const history = useHistory();  
    // Nótese que no es necesario que esto sea asíncrono para la redirección, no es necesario esperars  
    const handleClick = e => {
        deleteDocument(project.id); 
        history.push('/');
    }
    // Para ocultar el botón recordemos que el proyecto tiene una propiedad createdBy, dentro de esta está el id y podemos compararla con el id de la persona logueada
	return (
		<>  
			<div className='project-summary'>
				<h2 className='page-title'>{project.name}</h2>
                <p>Author: {project.createdBy.displayName}</p>
				<p className='due-date'>
					Project due by {project.dueDate.toDate().toDateString()}
				</p>
				<p className='details'>{project.details}</p>
				<h4>Project is assigned to:</h4>
				<div className='assigned-users'>
					{project.assignedUsersList.map(user => (
						<div key={user.id}>
							<Avatar src={user.photoURL} />
						</div>
					))}
				</div>
            {user.uid === project.createdBy.id && (
                <button className='btn' onClick={handleClick}>Mark as Completed</button>
            )}
			</div>
		</>
	);
};
