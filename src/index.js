import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import './style/themes.css';
import App from './components/App';
//import Login from './components/Login';
import SnackAlert from './libs/SnackAlert/SnackAlert.js';
import APIWorker from './logic/APIWorker';
import CookieManager from './logic/CookieManager';
//import * as serviceWorker from './serviceWorker';

window.APIWorker = APIWorker;
window.CookieManager = CookieManager;

//sezione per caricare session id
window.getCookie = CookieManager.getItem;

//sezione per caricare impostazioni e informazioni sull'utente
let isSessionValid = () => APIWorker.get('isSessionValid');

//inizializzo SnackAlert
SnackAlert.init();

//funzione per inizzializzare la app
let initApp = () => {
	const fd = new FormData();
	fd.append('what', 'settings,icon,name,email,role,description')
	
	APIWorker.post('getUserInfo', fd).then(rawResponse => rawResponse.json()).then(parsedResponse => {
			//salvo le impostazioni
			window.settings = parsedResponse['settings'] || {};

			//funzione per aggiornare le impostazioni
			window.settings.updateSettings = (entry) => {
				const fd = new FormData();
				fd.set('entry', entry);
				
				return APIWorker.post(
					'updateSettings', 
					fd
				);
			}

			//salvo il nome, il ruolo, l'email e l'icona
			window.profile = {
				name: parsedResponse['name'],
				email: parsedResponse['email'],
				role: parseInt(parsedResponse['role']),
				icon: parsedResponse['icon'],
				description: parsedResponse['description']
			};
			
			//avvio react
			ReactDOM.render(<App />, document.getElementById('root'));
		}).catch(() => SnackAlert.make({
			message: 'Unable to load settings',
			showAction: true, 
			actionMessage: 'Retry',
			actionCallback: initApp
		}));


	// If you want your app to work offline and load faster, you can change
	// unregister() to register() below. Note this comes with some pitfalls.
	// Learn more about service workers: https://bit.ly/CRA-PWA
	//serviceWorker.unregister();
}

//inizzializzo app se la sessione è valida
let valid = isSessionValid();
valid.then(response => {
	if(response.status === 200) {
		initApp();
	}
});
//altrimenti render pagina di login
//valid.catch(() => ReactDOM.render(<Login />, document.getElementById('root')));
