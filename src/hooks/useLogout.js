import { useEffect, useState } from 'react';
// Importamos el servicio de Firestore
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	// Obtenemos el usuario de nuestro contexto
	const { dispatch, user } = useAuthContext();

	const logout = async () => {
		setError(null);
		setIsPending(true);

		try {
			// Haremos el edit aquí. Queremos que sólo los usuarios logueados puedan manipular su propio documento (online true o false). Esto debe ser antes de que nos deslogueemos
			// Primero obtenemos el uid del usuario actualmente conectado
			const { uid } = user;
			// Usamos el método update y pasamos la propiedad que deseamos actualizar
			await projectFirestore
				.collection('users')
				.doc(uid)
				.update({ online: false });
			await projectAuth.signOut();

			dispatch({ type: 'LOGOUT' });

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

	return { logout, error, isPending };
};
