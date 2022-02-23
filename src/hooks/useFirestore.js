import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

let initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null,
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case 'IS_PENDING':
			return { isPending: true, document: null, success: false, error: null };
		case 'ADDED_DOCUMENT':
			return {
				isPending: false,
				document: action.payload,
				success: true,
				error: null,
			};
		case 'DELETED_DOCUMENT':
			return { isPending: false, document: null, success: true, error: null };
    // Creamos un nuevo caso para actualizar el estado, esto para la acción UPDATED_DOCUMENT. Recordemos que actualizamos el estado de la respuesta.
    case 'UPDATED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null};
		case 'ERROR':
			return {
				isPending: false,
				document: null,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const useFirestore = collection => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState);
	const [isCancelled, setIsCancelled] = useState(false);

	const ref = projectFirestore.collection(collection);

	const dispatchIfNotCancelled = action => {
		if (!isCancelled) {
			dispatch(action);
		}
	};

	const addDocument = async doc => {
		dispatch({ type: 'IS_PENDING' });

		try {
			const createdAt = timestamp.fromDate(new Date());
			const addedDocument = await ref.add({ ...doc, createdAt });
			dispatchIfNotCancelled({
				type: 'ADDED_DOCUMENT',
				payload: addedDocument,
			});
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
		}
	};

	const deleteDocument = async id => {
		dispatch({ type: 'IS_PENDING' });

		try {
			await ref.doc(id).delete();
			dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
		} catch (err) {
			dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' });
		}
	};
  // Creamos la función para actualizar los documentos. Tomamos como argumento el id del documento que deseamos actualizar, como segundo argumento pasaremos las actualizaciones que deseamos implementar.
  const updateDocument = async (id, updates) => {
    // Disparamos la acción IS_PENDING para indicar que estamos iniciadno el proceso
    dispatch({type: 'IS_PENDING'});
    // Luego iniciamos el bloque try/catch
    try {
      // Para actualizar el documento. Cuando actualizamos el documento Firestore nos retorna una referencia a ese documento actualizado. Como recordatorio ref es la referencia a la colección en cuestión (sería projects en este caso). Luego usamos doc para obtener la referencia al documento en específico y finalmente actualizamos con el método updates que recibe un objeto para actualizar, o en este caso, las updates que pasamos como argumentos
      const updatedDocument = await ref.doc(id).update(updates);
      // Usamos la función de dispatch if not canceled, recordemos que esta recibe una acción y despachará ésta siempre y cuando isCancelled sea false (como recordatorio, esta era una forma manual de manejar la cleanup function). Enviamos como payload también el documento actualizado
      dispatchIfNotCancelled({type: 'UPDATED_DOCUMENT', payload: updatedDocument});
      // También retornaremos el documento por si acaso
      return updatedDocument;
    } catch (err) {
      dispatchIfNotCancelled({type: 'ERROR', payload: err.message});
      // Retornamos null sólo por si queremos usar el valor que retorna la función
      return null;
    }
  }

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);
  // Retornamos también la función para actualizar un documento
	return { addDocument, deleteDocument, updateDocument, response };
};
