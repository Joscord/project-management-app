import { useState, useEffect } from 'react';
// Importamos el servicio de Firestore
import {
	projectAuth,
	projectStorage,
	projectFirestore,
} from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

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

			const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
			const img = await projectStorage.ref(uploadPath).put(thumbnail);
			const imgURL = await img.ref.getDownloadURL();

			await res.user.updateProfile({ displayName, photoURL: imgURL });

			// Vamos a crear aquí nuestra colección y documentos ya que en este punto ya tenemos displayName, la imagen subida y la propiedad de photoURL.
			// Nótese que no usamos el método add pues este añade un id automático generado por firebase y nosotros queremos que el documento tenga el mismo id que el uid del usuario logueado. Esta sinergía nos dará mejor control, linkeando autenticación y base de datos
			// Entonces usamos el método doc, al que debemos pasarle una referencia (id) al documento en la base de datos. Esta id vendrá de la respuesta, pues allí viene el usuario. Esto crea una referencia a un nuevo documento en la colección que tendrá el mismo id que el usuario logueado (uid). Aunque no exista, se creará. Luego usamos un método para actualizar las propiedades de este documento, el método set, al que le pasamos un objeto que representa la data del documento
			// pasamos una propiedad online que inicialmente será true, ya que el usuario se loguea automáticamente cuando se registra. Luego su nombre,
			await projectFirestore.collection('users').doc(res.user.uid).set({
				online: true,
				displayName,
				photoURL: imgURL,
			});

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
