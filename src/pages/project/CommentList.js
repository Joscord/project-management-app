import React from 'react';
// Importamos el Avatar
import Avatar from '../../components/avatar/Avatar';

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
                        <p>Date Here</p>
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
