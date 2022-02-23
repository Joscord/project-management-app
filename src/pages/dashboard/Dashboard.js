import { useState} from 'react';
import { ProjectList } from '../../components/projectlist/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import { ProjectFilter } from './ProjectFilter';
import './Dashboard.css';
import { useAuthContext } from '../../hooks/useAuthContext';

const Dashboard = () => {
	const { documents: projects, error } = useCollection('projects');
	// Cada vez que el filtro cambia, cambia el estado, el componente es reevaluado y obtenemos una nueva constante correspondiente a los docuemntos filtrados con este filtro actual
	const [currentFilter, setCurrentFilter] = useState('all');
	// Usamos el hook useAuthContext para saber el usuario actual
	const { user } = useAuthContext();


	const changeFilter = newFilter => {
		setCurrentFilter(newFilter);
	}
		// Creamos una constante que corresponderá a los proyectos filtrados. Ojo que primero debemos checkear que tenemos los documentos, el fetch puede demorar un par de segundos. Si no hay proyectos filteredProjects se vuelve null
	const filteredProjects = projects ? projects.filter(project => {
		switch(currentFilter) {
			case 'all':
				return true;
			case 'mine':
				// Creamos una variable assignedToMe cuyo valor inicial es false
				let assignedToMe = false;
				// Iteramos sobre los usuarios asignados al proyecto con forEach, a la función le pasaremos como parámetro el id de cada usuario
				project.assignedUsersList.forEach((u) => {
					if (user.uid === u.id) {
						// Si el id del usuario conectado corresponde a alguno de los id de los usuarios asignados al proyecto actualizamos el valor de la variable assignedToMe
						assignedToMe = true;
					}
				})
				// Devolvemos assignedToMe
				return assignedToMe;
				// Si el código para los casos es igual podemos apilarlos
			case 'development':
			case 'design':
			case 'sales':
			case 'marketing':
				return project.category === currentFilter;
			default:
				return true;
		}
	}) : null;


	return (
		<div>
			<h2 className='page-title'></h2>
			{error && <p className='error'>{error}</p>}
			{projects && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>}
			{/* Ahora en lugar de pasar todos los proyectos pasamos los filtrados*/}
			{projects && <ProjectList projects={filteredProjects}/>}
		</div>
	);
};

export default Dashboard;
