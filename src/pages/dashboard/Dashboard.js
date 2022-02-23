import { useState} from 'react';
import { ProjectList } from '../../components/projectlist/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import { ProjectFilter } from './ProjectFilter';
import './Dashboard.css';

const Dashboard = () => {
	const { documents: projects, error } = useCollection('projects');
	const [currentFilter, setCurrentFilter] = useState('all');

	const changeFilter = newFilter => {
		setCurrentFilter(newFilter)
	}

	return (
		<div>
			<h2 className='page-title'></h2>
			{error && <p className='error'>{error}</p>}
			{projects && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>}
			{projects && <ProjectList projects={projects}/>}
		</div>
	);
};

export default Dashboard;
