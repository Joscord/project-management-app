// Importamos useEffect, useState y los servicios de Firestore
import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

// Este hook aceptará dos cosas: la colección a la que pertenece el documento y el id del mismo
export const useDocument = (collection, id) => {
	// Generamos piezas de estado para el documento y para el error
	const [document, setDocument] = useState(null);
	const [error, setError] = useState(null);
	
    // Obteniendo real-time data, esto lo hacemos dentro de useEffect. Queremos que la función corra si la colección o el id del documento cambian, así que usamos esos como dependencias
    useEffect(() => {
        // Primero obtenemos una referencia para el documento en particular
        const ref = projectFirestore.collection(collection).doc(id)

        // Luego usamos el método onSnapshot para obtener data real-time sobre ese documento. Dentro de este método definimos una función que se dispara siempre que recibimos un snapshot desde la base de datos. Este snapshot básicamente representa el documento en la base de datos
        const unsuscribe = ref.onSnapshot(snapshot => {
            // Actualizamos el estado del documento en base al snapshot. Recordar que usamos el método data() sobre una referencia para obtener la información del documento. Nótese que también pasamos el id. El id no viene de data() sino que es un valor del snapshot en sí. Recordemos también que si hay un error, es el segundo argumento de onSnapshot, donde podemos definir una función para manejarlo
            setDocument({
                ...snapshot.data(), id: snapshot.id
            }, err => {
                setError(err.message);
            });
            // Reseteamos el error
            setError(null);
        })

        // Necesitamos también retornar una función de cleanup para desuscribirnos de onSnapshot si es que se desmonta el componente en que es usado. El método onSnapshot nos retorna un método para desuscribirnos
        return () => {
            unsuscribe();
        }
    }, [collection, id]);
    // Lo último es retornar lo que usaremos del hook
    return {
        document, 
        error
    }
};
