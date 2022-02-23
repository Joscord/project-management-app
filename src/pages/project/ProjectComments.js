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
		await updateDocument(project.id, {
			comments: [...project.comments, commentToAdd]
		});
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
