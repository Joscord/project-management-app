// Importamos nuestro custom hook
import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import './Login.css';


const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const {login, error, isPending} = useLogin();

	const handleSubmit = e => {
		e.preventDefault();
		login(email, password)
	}

	return (
		<form className='auth-form' onSubmit={handleSubmit}>	
			<label>
				<span>Email</span>
				<input
					type='email'
					onChange={e => setEmail(e.target.value)}
					required
					value={email}
				/>
			</label>
			<label>
				<span>Password: </span>
				<input
					type='password'
					onChange={e => setPassword(e.target.value)}
					required
					value={password}
				/>
			</label>
			{isPending ? <button disabled>Loading...</button>: <button className='btn'>Login</button>}
			{error && <p className='error'>{error}</p>}
		</form>
	);
};

export default Login;
