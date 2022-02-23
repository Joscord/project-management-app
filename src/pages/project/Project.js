// Necesitamos usar useParams para obtener el id desde la URL
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
// importamos useDocument
import { useDocument } from '../../hooks/useDocument';

import './Project.css';

const Project = () => {
	const { id } = useParams();
	const { document: project, error } = useDocument('projects', id);	
	if (error) {
		return <div className='error'>{error}</div>
	};
	if (!project) {
		return <div className='loading'>Loading...</div>
	}
	return (
		<div className='project-details'>
			<h1>{project.name}</h1>

		</div>
	)

};

export default Project;
