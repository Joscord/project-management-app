import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useDocument = (collection, id) => {
	const [document, setDocument] = useState(null);
	const [error, setError] = useState(null);
	
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)

        const unsuscribe = ref.onSnapshot(snapshot => {
            // Hacemos un checkeo del snapshot, si hay data actualizamos la del documento y si no hay data actualizamos el estado del error
            if (snapshot.data()) {
                setDocument({
                    ...snapshot.data(), id: snapshot.id
                })
                setError(null);

            } else {
                setError('Document does not exists')
            }
        }, err => {
            setError(err.message);
        });

        return () => {
            unsuscribe();
        }
    }, [collection, id]);
    return {
        document, 
        error
    }
};
