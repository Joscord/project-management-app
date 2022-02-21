// Importamos el componente Redirect
import {
	BrowserRouter,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom/cjs/react-router-dom.min';

import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
	// Destructuramos la propiedad user de nuestro contexto. También tomamos authIsReady, recordemos que esta propiedad es una propiedad que nos sirve para no cargar la app hasta que sepamos si estamos logueados o no en Firebase. Dependiendo de esto vemos qué contenido mostramos
	const { user, authIsReady } = useAuthContext();

	return (
		<div className='App'>
			{authIsReady && (
				<BrowserRouter>
					{user && <Sidebar />}
					<div className='container'>
						<Navbar />
						<Switch>
							<Route exact path='/'>
								{user ? <Dashboard /> : <Redirect to={'/login'}/>}
							</Route>
							<Route path='/create'>
								{user ? <Create /> : <Redirect to={'/login'}/>}
							</Route>
							<Route path='/projects/:id'>
								{user ? <Project /> : <Redirect to={'/login'}/>}
							</Route>
							<Route path='/login'>
								{!user ? <Login /> : <Redirect to={'/'}/>}
							</Route>
							<Route path='/signup'>
								{!user ? <Signup /> : <Redirect to={'/'}/>}
							</Route>
						</Switch>
					</div>
				</BrowserRouter>
			)}
		</div>
	);
};

export default App;
