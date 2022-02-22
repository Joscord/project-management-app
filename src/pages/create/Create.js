import React, { useEffect, useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore'; 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Select from 'react-select';
import './Create.css';
import { timestamp } from '../../firebase/config';

const categories = [
	{
		value: 'development',
		label: 'Development',
	},
	{
		value: 'design',
		label: 'Design',
	},
	{
		value: 'sales',
		label: 'Sales',
	},
	{
		value: 'marketing',
		label: 'Marketing',
	},
];
const Create = () => {
	const [name, setName] = useState('');
	const [details, setDetails] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [category, setCategory] = useState('');
	const [assignedUsers, setAssignedUsers] = useState([]);
	const [users, setUsers] = useState([]);
	const { documents, error } = useCollection('users');
	const [formError, setFormError] = useState(null);
	const { user } = useAuthContext();  
	// Del hook useFirestore destructuramos los elementos que necesitamos
	const { addDocument, response } = useFirestore('projects');
	// Obtenemos el objeto de historial del hook useHistory
	const history = useHistory();


	useEffect(() => {
		if (documents) {
			const options = documents.map(user => {
				return {
					value: user,
					label: user.displayName,
				};
			});
			setUsers(options);
		}
	}, [documents]);
	// Debemos hacer que esto proceso sea asíncrono para poder esperar a que el documento sea añadido
	const handleSubmit = async e => {
		e.preventDefault();
		setFormError(null);
		if (!category) {
			setFormError('Please select a catefory for the project');
			return;
		}
		if (assignedUsers.length < 1) {
			setFormError('Please assign at least one user to the project');
			return;
		}

		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid
		}

		const assignedUsersList = assignedUsers.map(user => {
			return {
				displayName: user.value.displayName,
				photoURL: user.value.photoURL,
				id: user.value.id
			}
		})

		const project = {
			name, 
			details,
			dueDate: timestamp.fromDate(new Date(dueDate)),
			category: category.value,
			comments: [],
			createdBy,
			assignedUsersList,
		}
		// Usamos la función para añadir nuevos documentos de useFirestore
		await addDocument(project);
		// Redirigiremos al dashboard sí es que se añadió el proyecto exitosamente, para eso usaremos la respuesta que obtenemos del hook
		if (!response.error) {
			history.push('/');
		}

	};

	return (
		<div className='create-form'>
			<h2 className='page-title'>Create a New Project</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Project Name:</span>
					<input
						type='text'
						onChange={e => setName(e.target.value)}
						value={name}
						required
					/>
				</label>
				<label>
					<span>Add Details:</span>
					<textarea
						onChange={e => setDetails(e.target.value)}
						value={details}
						required
					/>
				</label>
				<label>
					<span>Due Date:</span>
					<input
						type='date'
						onChange={e => setDueDate(e.target.value)}
						value={dueDate}
						required
					/>
				</label>
				<label>
					<span>Project Category:</span>
					<Select
						onChange={option => setCategory(option)}
						options={categories}
					/>
				</label>
				<label>
					<span>Assign To:</span>
					<Select
						options={users}
						onChange={option => setAssignedUsers(option)}
						isMulti
					/>
				</label>
				<button className='btn'>Add Project</button>
				{formError && <p className='error'>{formError}</p>}
			</form>
		</div>
	);
};

export default Create;
