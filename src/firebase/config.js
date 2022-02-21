import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyCqDBM7f08BoaWoK_J7_TncjmjzBKVMPqs',
	authDomain: 'projectm-backend.firebaseapp.com',
	projectId: 'projectm-backend',
	storageBucket: 'projectm-backend.appspot.com',
	messagingSenderId: '179616182652',
	appId: '1:179616182652:web:967889f9fce65bc99e34f9',
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

const projectAuth = firebase.auth();

const projectStorage = firebase.storage();

const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
