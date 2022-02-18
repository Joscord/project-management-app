import './Sidebar.css';
import dashboardIcon from '../../assets/dashboard_icon.svg';
import addIcon from '../../assets/add_icon.svg';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<div className='sidebar-content'>
				<div className='user'>
					<p>user here</p>
				</div>
				<nav className='links'>
					<ul>
						<li>
							{/* AÑadimos NavLink porque le da una clase activa a los links */}
							<NavLink exact to={'/'}>
								<img src={dashboardIcon} alt='dashboard-icon' />
								<span>Dashboard</span>
							</NavLink>
						</li>
						<li>
							{/* AÑadimos NavLink porque le da una clase activa a los links */}
							<NavLink to={'/create'}>
								<img src={addIcon} alt='add-project-icon' />
								<span>New Project</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
