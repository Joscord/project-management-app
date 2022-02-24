import React from 'react';
// Importamos el Avatar
import Avatar from '../../components/avatar/Avatar';
// Importamos la función formatDistanceToNow. Esta función revisa la fecha que le pasemos y calcula la distancia hacia la fecha actual
import formatDistanceToNow from 'date-fns/formatDistanceToNow'; 

export const CommentList = ({ project }) => {
	// Destructuramos los comentarios
	const { comments } = project;

	return (
    <ul>
        {
            comments.length > 0 && comments.map(comment => (
                <li key={comment.id}>
                    <div className='comment-author'>
                        <Avatar src={comment.photoURL}/>
                        <p>{comment.displayName}</p>
                    </div>
                    <div className='comment-date'>
                        {/* El primer parámetro es una fecha. Como createdAt es un timestamp debemos transformarlo a una fecha con toDate(). El segundo argumento es un objeto con opciones. Pasamos la opción addSuffix: true para que añada la palabra ago al final */}
                        <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true})}</p>
                    </div>
                    <div className='comment-content'>
                        <p>{comment.content}</p>
                    </div>
                </li>
            ))
        }
    </ul>
    );
};
