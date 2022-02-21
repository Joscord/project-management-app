import { useState, useEffect } from 'react';
// Como usaremos Storage importamos este servicio
import { projectAuth, projectStorage } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	// Como parámetro también recibiremos el thumbnail
	const signup = async (email, password, displayName, thumbnail) => {
		setError(null);
		setIsPending(true);

		try {
			const res = await projectAuth.createUserWithEmailAndPassword(
				email,
				password
			);

			if (!res) {
				throw new Error('Could not complete signup');
			}

			// Queremos subir la foto en este punto. Porque aquí ya tendremos una uid del usuario y es la que usaremos para el path de la imagen subida. Cuando subimos una imagen podemos hacerlo a una carpeta en específico, esta carpeta será el id del usuario. Por eso debe hacerse después de crear el usuario pero antes actualizarlo.
			// Creamos una constante uploadPath que almacena un template string. Si el folder thumbnails no existe se va a crear cuando subamos la primera imagen. El siguiente folder es con el id del usuario (uid). POr último el nombre de la imagen que viene en thumbnail
			const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
			// Ahora con el path vamos a subir la imagen. Usamos await porque es un proceso asíncrono. Usamos el método ref. Este método acepta un path y básicamente es la referencia hacia donde queremos subir la imagen. Luego usamos el método put para colocar la imagen en ese espacio de memoria en específico (referenciado con el path). Esto nos devuelve un objeto imagen. Dentro de esta imagen hay diferentes propiedades que podemos utilizar...
			const img = await projectStorage.ref(uploadPath).put(thumbnail);
      // Usamos la prop ref para acceder a la referecnia y luego el método getDownloadURL() para obtener la url
      const imgURL = await img.ref.getDownloadURL();

      // Pasamos la URL a la prop photoURl
			await res.user.updateProfile({ displayName, photoURL: imgURL});

			dispatch({ type: 'LOGIN', payload: res.user });

			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			if (!isCancelled) {
				setError(err.message);
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { signup, error, isPending };
};
