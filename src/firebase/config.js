// importamos firebase y los servicios que ocuparemos para el proyecto
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Nuestro objeto de configuración facilitado por firebase
const firebaseConfig = {
	apiKey: 'AIzaSyCqDBM7f08BoaWoK_J7_TncjmjzBKVMPqs',
	authDomain: 'projectm-backend.firebaseapp.com',
	projectId: 'projectm-backend',
	storageBucket: 'projectm-backend.appspot.com',
	messagingSenderId: '179616182652',
	appId: '1:179616182652:web:967889f9fce65bc99e34f9',
};

// Inicializamos firebase
firebase.initializeApp(firebaseConfig);
// Inicializamos firestore
const projectFirestore = firebase.firestore();
// inicializamos la autenticación
const projectAuth = firebase.auth();

// Vamos a preparar nuestra función de timestamps
const timestamp = firebase.firestore.Timestamp;

// Exportamos los servicios
export { projectFirestore, projectAuth, timestamp };
