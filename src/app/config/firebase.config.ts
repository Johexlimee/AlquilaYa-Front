import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../../environments/environment';

// Inicializa la app de Firebase con las configuraciones de tu proyecto
const app = initializeApp(environment.firebase);

// Obtén la instancia de autenticación de Firebase
const auth = getAuth(app);

export { app, auth };
