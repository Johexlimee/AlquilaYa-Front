# AlquilayaFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.



Usar npm

Usar una etiqueta <script>
Si ya usas npm y un agrupador de módulos como Webpack o Rollup, puedes ejecutar el siguiente comando para instalar la versión más reciente del SDK (más información):

npm install firebase
Luego, inicializa Firebase y comienza a usar los SDK de los productos que quieres utilizar.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHwEJbsMFedR0vzF5e63IJ9Bpeqx-nfyo",
  authDomain: "alquilaya-8aafe.firebaseapp.com",
  projectId: "alquilaya-8aafe",
  storageBucket: "alquilaya-8aafe.firebasestorage.app",
  messagingSenderId: "471471306678",
  appId: "1:471471306678:web:f6f61e072185ecb3a3f317",
  measurementId: "G-FWF35E4CW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



private handleAuthError(error: any): void {
  switch (error.code) {
    case 'auth/popup-closed-by-user':
      console.error('El usuario cerró el popup antes de completar el proceso.');
      break;
    case 'auth/network-request-failed':
      console.error('Hubo un problema de red. Verifica tu conexión.');
      break;
    case 'auth/argument-error':
      console.error('Error en los argumentos. Verifica la configuración del proveedor.');
      break;
    default:
      console.error('Error desconocido:', error.message);
      break;
  }
}


// Login con Facebook
loginWithFacebook(): Observable<any> {
  const provider = new FacebookAuthProvider();
  return new Observable((observer) => {
    this.afAuth.signInWithPopup(provider)
      .then((result) => {
        observer.next(result);
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}





  





// Método para iniciar sesión con el correo electrónico y la contraseña
public login(email: string, password: string): Observable<any> {
  const loginData = { email, password };
  return this.http.post<any>(`${this.apiUrl}public/login`, loginData).pipe(
    tap((response) => {
      if (response.accessToken && response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('accessToken', response.accessToken);
        this.accessToken = response.accessToken;
        this.role = response.role;

        console.log('Rol del usuario:', this.role);
        // Redirige según el rol
        if (this.role === 'ADMIN') {
          this.router.navigateByUrl('/admin/profile');
        } else {
          this.router.navigate(['/user']);
        }
      }
    })
  );
}



  public register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    typeDocumentId: number,
    documentNumber: string
  ): Observable<any> {
    const registerData = {
      email,
      password,
      firstName,
      lastName,
      typeDocumentId,
      documentNumber,
    };
    return this.http
      .post<any>(`${this.apiUrl}public/register`, registerData)
      .pipe(
        tap((response: { userId: string | number }) => {
          if (response.userId) {
            this.alertService.showSuccess('Operación realizada con éxito.');
            this.router.navigateByUrl('/');
          }
        }),
        catchError((error) => {
          console.error('Error en el registro', error);
          this.alertService.showError('Algo salió mal.');
          return of(null);
        })
      );
  }

  // Método para obtener el token de acceso
  public getAccessToken(): string | null {
    return this.accessToken;
  }

  // Método para obtener el refresh token desde el localStorage
  public getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  // Método para hacer logout: eliminar los tokens
  public logout(): void {
    localStorage.removeItem('refreshToken');
    this.accessToken = null;
    this.router.navigate(['/login']);
  }

  public getUserDetails(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Token de acceso no encontrado');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}user/details-user`, { headers });
  }
  
  public getAllUserDetails(): Observable<any> {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('Token de acceso no encontrado');
    }
 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}admin/user-all`, { headers });
  }


  

