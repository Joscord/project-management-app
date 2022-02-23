import { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { CommentList } from './CommentList';

// Podemos pasar el proyecto en sí desde Project como prop y utilizarlo en este componente
export const ProjectComments = ({ project }) => {
	const [newComment, setNewComment] = useState('');
	const { user } = useAuthContext();
	const { photoURL, displayName } = user;
	// Destructuramos lo que necesitamos de useFirestore
	const { updateDocument, response } = useFirestore('projects');

	const handleSubmit = async e => {
		e.preventDefault();
		const commentToAdd = {
			displayName,
			photoURL,
			content: newComment,
			createdAt: timestamp.fromDate(new Date()),
			id: Math.random(),
		};
		// Usamos await para esperar a que se actualice el documento. Nótese que cuando actualizamos el documento lo hacemos tomando en consideración los comentarios que ya existen (por eso usamos ...project.comments) y luego añadimos el nuevo). Recordemos también que la función updateDocument recibe como. También cabe recordar que sólo actualizamos los comentarios y las demás propiedad o campos del documento permanecen intactos
		await updateDocument(project.id, {
			comments: [...project.comments, commentToAdd]
		});
        // Luego de añadir el comentario queremos resetear el estado de NewComment, así también se actualiza la caja donde escribimos los comentarios. Primero hacemos una revisión del error (esto viene en nuestro objeto de respuesta) y si no hay error entonces actualizamos el estado
        if (!response.error) {
            setNewComment('');
        }
	};
	return (
		<div className='project-comments'>
			<h4>Comments</h4>
            <CommentList project={project}/>
			<form className='add-comment' onSubmit={handleSubmit}>
				<label>
					<span>Add New Comment:</span>
					<textarea
						required
						onChange={e => setNewComment(e.target.value)}
						value={newComment}
					/>
				</label>
				<button className='btn'>Add Comment</button>
			</form>
		</div>
	);
};
