import './Signup.css';

import React, { useState } from 'react';

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [thumbnail, setThumbnail] = useState(null);
	// Manejaremos un estado para el error de la selección del archivo
	const [thumbnailError, setThumbnailError] = useState(null);
	const handleSubmit = {};
	// Definimos ls función para cuando se selecciona un archivo
	const handleFileChange = e => {
		// Primero vamos a resetear el estado por si había otra imagen seleccionada de antes
		setThumbnail(null);
		// Podemos ver qué archivo seleccionó el usuario. files retorna un arreglo de archivos (esto porque uno puede seleecionar varios archivos). Pero sólo escogeremos el primero del arreglo a través de su índice
		let selectedFile = e.target.files[0];
		// Podemos usar la propiedad type del archivo para verificar que subió una imagen y no otro tipo de archivo.
		// Primero verificamos por undefined. El valor es undefined si el usuario en lugar de seleccionar un archivo da a la opción cancel
		if (!selectedFile) {
			setThumbnailError('Please select a file');
			return;
		}
		// Luego el segundo check es ver que sea la imagen. Usando el método includes vemos que la propiedad type incluya el string image (independiente si luego sigue png o jpeg u otro formato). Y si no lo incluye actualizamos el error
		if (!selectedFile.type.includes('images')) {
			setThumbnailError('Selected file must be an image');
			return;
		}
		// Lo siguiente es checkear el tamaño en base a la propiedad size. No puedes ser mayor de 100000 bytes	
		if (selectedFile.size > 100000) {
			setThumbnailError('Image file size must be less than 100kb');
			return;
		}
		// Si pasamos todo los checks podemos seguir con la función. Primero reseteamos el error
		setThumbnailError(null);
		// Actualizamos el estado thumbnail
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
				<input type='file' required onChange={handleFileChange} />
				{thumbnailError && <div className='error'>{thumbnailError}</div>}
			</label>	
			<button>Sign Up</button>
		</form>
	);
};

export default Signup;
