import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useDocument = (collection, id) => {
	const [document, setDocument] = useState(null);
	const [error, setError] = useState(null);
	
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        const unsuscribe = ref.onSnapshot(snapshot => {
            // Revisamos si el snapshot tiene data o no, si tiene actualizamos el estado de document pero sino entonces actualizamos el error
            if (snapshot.data()) {
                setDocument({
                    ...snapshot.data(), id: snapshot.id
                })
            } else {
                setError('Document does not exists')
            }
        }, err => {
            setError(err.message);
        });
        setError(null)

        return () => {
            unsuscribe();
        }
    }, [collection, id]);
    return {
        document, 
        error
    }
};
