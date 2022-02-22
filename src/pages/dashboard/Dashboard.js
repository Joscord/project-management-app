import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import './Dashboard.css';

const Dashboard = () => {
	// Destructuramos la colección de useCollection
	const { documents: projects, error } = useCollection('projects');

	return (
		<div>
			<h2 className='page-title'></h2>
			{error && <p className='error'>{error}</p>}
			{projects && projects.map(project => (
				<p key={project.id}>{project.name}</p>
			))}
		</div>
	);
};

export default Dashboard;
