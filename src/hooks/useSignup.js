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

			const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
			const img = await projectStorage.ref(uploadPath).put(thumbnail);
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
