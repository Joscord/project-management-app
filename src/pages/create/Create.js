import './Create.css';

import React, { useState } from 'react';

const Create = () => {
	// Creamos 5 piezas diferentes de estado que manejarán los 5 campos a llenar del formulario
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
