import './Signup.css';

import React, { useState } from 'react';

const Signup = () => {
	// Creamos piezas de estado para manejar name, email, password, confirmPassword y la imagen que subirá el usuario
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [thumbnail, setThumbnail] = useState(null);
	const handleSubmit = {
	}
	
	return (
		<form className='auth-form' onSubmit={handleSubmit}>
			<h2>Sign up</h2>
			<label>
				<span>Name: </span>
				<input
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
					required
				/>
			</label>
			<label>
				<span>Email: </span>
				<input
					type='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
			</label>
			<label>
				<span>Password: </span>
				<input
					type='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
			</label>
			<label>
				<span>Confirm password: </span>
				<input
					type='password'
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					required
				/>
			</label>
			<label>
				<span>Profile Picture: </span>
				<input
					type='file'
					required
				/>
			</label>
			<button>Sign Up</button>
		</form>
	);
};

export default Signup;
