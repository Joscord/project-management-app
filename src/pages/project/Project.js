// Necesitamos usar useParams para obtener el id desde la URL
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
// importamos useDocument
import { useDocument } from '../../hooks/useDocument';

import './Project.css';

const Project = () => {
	const { id } = useParams();
	// Con este id podemos obtener un documento en específico usando nuestro custom hook useDocument
	const { document: project, error } = useDocument('projects', id);	
	// Mostramos una forma alternativa de enseñar un template de error
	if (error) {
		return <div className='error'>{error}</div>
	};
	// De la misma forma que para el error podemos mostrar un mensaje de carga
	if (!document) {
		return <div className='loading'>Loading...</div>
	}
	return (
		<div className='project-details'>
			<h1>{project.name}</h1>

		</div>
	)

};

export default Project;
