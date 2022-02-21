import './Signup.css';

import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordError, setPasswordError] = useState(null);
	const [thumbnail, setThumbnail] = useState(null);
	const [thumbnailError, setThumbnailError] = useState(null);
	// Destructuramos de useSignup
	const { signup, error, isPending } = useSignup();

	const handleSubmit = e => {
		e.preventDefault();
		setPasswordError(null);
		if (password !== confirmPassword) {
			setPasswordError('Passwords do not match');
			return;
		}

		// Invocamos al método signup
		signup(email, password, name, thumbnail);
	};

	const handleFileChange = e => {
		setThumbnail(null);
		let selectedFile = e.target.files[0];
		if (!selectedFile) {
			setThumbnailError('Please select a file');
			return;
		}
		if (!selectedFile.type.includes('image')) {
			setThumbnailError('Selected file must be an image');
			return;
		}
		if (selectedFile.size > 100000) {
			setThumbnailError('Image file size must be less than 100kb');
			return;
		}
		setThumbnailError(null);
		setThumbnail(selectedFile);
	};

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
				{passwordError && <p className='error'>{passwordError}</p>}
			</label>
			<label>
				<span>Confirm password: </span>
				<input
					type='password'
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					required
				/>
				{passwordError && <p className='error'>{passwordError}</p>}
			</label>
			<label>
				<span>Profile Picture: </span>
				<input type='file' required onChange={handleFileChange} />
				{thumbnailError && <div className='error'>{thumbnailError}</div>}
			</label>
			{isPending ? (
				<button disabled>Loading...</button>
			) : (
				<button className='btn'>Sign Up</button>
			)}
			{error && <p className='error'>{error}</p>}
		</form>
	);
};

export default Signup;
