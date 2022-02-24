import './OnlineUsers.css';
import { useCollection } from '../../hooks/useCollection';
import Avatar from '../avatar/Avatar';

import React from 'react';

const OnlineUsers = () => {
	const { documents: users, error } = useCollection('users');
	return (
		<div className='user-list'>
			<h2>All Users</h2>
            {error && <div className='error'>{error}</div>}
            {users && users.map(user => (
                <div key={user.id} className='user-list-item'> 
                    {user.online && <span className='online-user'/>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL}/>
                </div>
            ))}
		</div>
	);
};

export default OnlineUsers;
