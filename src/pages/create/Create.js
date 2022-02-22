import React, { useEffect, useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import Select from 'react-select';
import './Create.css';

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
	// Crearemos una nueva pieza de estado para manejar el error del formulario
	const [formError, setFormError] = useState(null);


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

	const handleSubmit = e => {
		e.preventDefault();
		// Reseteamos el error del formulario cada vez que intentamos enviar el formulario
		setFormError(null);
		// Podemos revisar si category y assignedUsers tienen valor
		if (!category) {
			setFormError('Please select a catefory for the project');
			return;
		}
		// Como un arreglo vacío es un valor truthy debemos hacer el check diferente a category
		if (assignedUsers.length < 1) {
			setFormError('Please assign at least one user to the project');
			return;
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
