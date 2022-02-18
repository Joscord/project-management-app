import templeLogo from '../../assets/temple.svg';
import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
	return (
		<div>
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
					<button className='btn'>Logout </button>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
