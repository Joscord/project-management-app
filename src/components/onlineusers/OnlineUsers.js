import './OnlineUsers.css';
// Importamos el hook useCollection para obtener la colección de usuarios
import { useCollection } from '../../hooks/useCollection';
import Avatar from '../avatar/Avatar';

import React from 'react';

const OnlineUsers = () => {
	const { documents: users, error } = useCollection('users');
	return (
		<div className='user-list'>
			<h2>All Users</h2>
            {error && <div className='error'>{error}</div>}
            {documents && documents.map(user => (
                <div key={user.id}>
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL}/>
                </div>
            ))}
		</div>
	);
};

export default OnlineUsers;
