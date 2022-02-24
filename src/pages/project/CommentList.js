import React from 'react';
import Avatar from '../../components/avatar/Avatar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'; 

export const CommentList = ({ project }) => {
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
