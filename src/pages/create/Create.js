import React, { useState } from 'react';
import Select from 'react-select';
import './Create.css';

// Los tag de <option value='lorem' label 'lorem'> lucen así. CUando usamos select creamos un arreglo con las opciones, un arreglo de objetos, con las propiedades value y label. Luego simplemente pasamos este arreglo. También hay una diferencia en la función que maneja el estado ya que no recibe el evento como parámetro sino que la opción seleccionada.
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
				<span>Assigned To:</span>
			</label>
			<button className='btn'>Add Project</button>
		</form>
	</div>
	)
};

export default Create;
