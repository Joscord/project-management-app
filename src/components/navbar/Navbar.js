import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import templeLogo from '../../assets/temple.svg';
import './Navbar.css';

const Navbar = () => {
	// Destructuramos la función de logout y demases de nuestro hook
	const { logout, isPending } = useLogout();

	return (
		<div className='navbar'>
			<ul>
				<li className='logo'>
					<img src={templeLogo} alt='dojo-logo' />
					<span>P. Management App</span>
				</li>
				<li>
					<Link to={'/login'}>Login</Link>
				</li>
				<li>
					<Link to={'/signup'}>Signup</Link>
				</li>
				<li>
					{isPending ? <button className='btn' disabled>Logging out...</button> : <button className='btn' onClick={logout}>Logout </button>}
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
