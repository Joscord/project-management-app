import { useState} from 'react';
import { ProjectList } from '../../components/projectlist/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import { ProjectFilter } from './ProjectFilter';
import './Dashboard.css';
import { useAuthContext } from '../../hooks/useAuthContext';

const Dashboard = () => {
	const { documents: projects, error } = useCollection('projects');
	const [currentFilter, setCurrentFilter] = useState('all');
	const { user } = useAuthContext();


	const changeFilter = newFilter => {
		setCurrentFilter(newFilter);
	}
	const filteredProjects = projects ? projects.filter(project => {
		switch(currentFilter) {
			case 'all':
				return true;
			case 'mine':
				let assignedToMe = false;
				project.assignedUsersList.forEach((u) => {
					if (user.uid === u.id) {
						assignedToMe = true;
					}
				})
				return assignedToMe;
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
			{projects && <ProjectList projects={filteredProjects}/>}
		</div>
	);
};

export default Dashboard;
