import React, { useEffect, useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import Select from 'react-select';
import './Create.css';

const categories = [
	{
		value: 'development', label: 'Development'
	},
	{
		value: 'design', label: 'Design'
	},
	{
		value: 'sales', label: 'Sales'
	},
	{
		value: 'marketing', label: 'Marketing'
	}
]
const Create = () => {
	const [name, setName] = useState('');
	const [details, setDetails] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [category, setCategory] = useState('');
	const [assignedUsers, setAssignedUsers] = useState([]);
	// Creamos una nueva pieza de estado para los usuarios de la colección
	const [users, setUsers] = useState([]);
	// Primero vamos a obtener todos los usuarios con useCollection.
	const {documents, error} = useCollection('users');
	// Usamos useEffect para escuchar cambios en la colección y actualizar así nuestras opciones. Primero debemos evaluar si hay o no documentos. Si hay documentos entonces se ejecuta el código dentro de if donde básicamente hacemos map al arreglo de documentos para obtener un nuevo arreglo con el formato que necesitamos para las opciones de select.
	useEffect(() => {
		if (documents) {
			const options = documents.map(user => {
				return {
					value: user,
					label: user.displayName
				}
			})
			// Actualizamos el estado
			setUsers(options);
		}
	},[documents]);

	const handleSubmit = e => {
		e.preventDefault();
	}

	return (
	<div className='create-form'>
		<h2 className="page-title">Create a New Project</h2>
		<form onSubmit={handleSubmit}>
			<label>
				<span>Project Name:</span>
				<input type='text' onChange={e => setName(e.target.value)} value={name} required/>
			</label>
			<label>
				<span>Add Details:</span>
				<textarea onChange={e => setDetails(e.target.value)} value={details} required/>
			</label>
			<label>
				<span>Due Date:</span>
				<input type='date' onChange={e => setDueDate(e.target.value)} value={dueDate} required/>
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
				{/* Añadiendo la propiedad isMulti podemos seleccionar más de una opción, además nos da la opción de eliminar un usuario ya seleccionado */}
				<Select options={users} onChange={option => setAssignedUsers(option)} isMulti/>
			</label>
			<button className='btn'>Add Project</button>
		</form>
	</div>
	)
};

export default Create;
