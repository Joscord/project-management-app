import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom/cjs/react-router-dom.min';

import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';

const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
			<Sidebar/>
				<div className='container'>
					<Navbar />
					<Switch>
						<Route exact path='/'>
							<Dashboard />
						</Route>
						<Route path='/create'>
							<Create />
						</Route>
						<Route path='/projects/:id'>
							<Project />
						</Route>
						<Route path='/login'>
							<Login />
						</Route>
						<Route path='/signup'>
							<Signup />
						</Route>
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
