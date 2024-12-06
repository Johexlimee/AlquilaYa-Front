import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthcontrollerService {
  private apiUrl: string = 'http://localhost:8080/api/v1/';
  private role: string | null = null;

  private firebaseTokenInMemory: string | null = null;
  private accessToken: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  // Recuperar el accessToken desde la memoria
  public getAccessToken(): Observable<string | null> {
    // Si el accessToken no está en memoria, hacemos el refresh
    if (this.accessToken) {
      return of(this.accessToken); // Si el token ya está en memoria, lo retornamos
    }

    // Si no hay accessToken en memoria, actualizamos con el refreshToken
    return this.refreshToken().pipe(
      switchMap(() => {
        return of(this.accessToken); // Retornamos el accessToken luego de actualizarlo
      })
    );
  }

  // Verificar si el usuario está autenticado
  public isLoggedIn(): Observable<boolean> {
    return this.getAccessToken().pipe(
      switchMap((token) => {
        return of(token !== null);
      })
    );
  }

  // Recuperar el token de Firebase desde la memoria
  public getFirebaseToken(): string | null {
    return this.firebaseTokenInMemory;
  }

  // Login con Google
  async loginWithGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      console.log('Token del usuario:', idToken);

      this.firebaseTokenInMemory = idToken;

      return result;
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      throw error;
    }
  }

  // Login con Facebook
  async loginWithFacebook(): Promise<any> {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      console.log('Token de usuario (Facebook):', idToken);

      this.firebaseTokenInMemory = idToken;

      return result;
    } catch (error) {
      console.error('Error al iniciar sesión con Facebook:', error);
      throw error;
    }
  }

  // Método para iniciar sesión con correo y contraseña
  async loginWithEmail(email: string, password: string): Promise<any> {
    try {
      // Intentamos iniciar sesión con las credenciales proporcionadas
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );

      // Verificamos si el usuario se autenticó correctamente
      if (result.user) {
        const idToken = await result.user.getIdToken();
        console.log('Token de usuario (Email):', idToken);

        // Guardamos el token de Firebase en memoria para futuros usos
        this.firebaseTokenInMemory = idToken;

        // Llamamos al backend para autenticarnos con el token de Firebase
        await firstValueFrom(this.firebaseAuth()); // Usamos firstValueFrom en lugar de toPromise()

        return result;
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      // Manejamos el error de manera adecuada
      console.error('Error al iniciar sesión con correo y contraseña:', error);
    }
  }

  // Método para registrarse con correo y contraseña
  async registerWithEmail(email: string, password: string): Promise<any> {
    try {
      // Intentamos registrar al usuario con correo y contraseña
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Verificamos si el usuario se creó correctamente
      if (result.user) {
        const idToken = await result.user.getIdToken();
        console.log('Token de usuario registrado:', idToken);

        // Guardamos el token de Firebase en memoria para futuros usos
        this.firebaseTokenInMemory = idToken;

        // Llamamos al backend para registrar/autenticar al usuario con el token de Firebase
        await firstValueFrom(this.firebaseAuth()); // Usamos el método `firebaseAuth`

        return result; // Devolvemos el resultado del registro
      } else {
        throw new Error('No se pudo crear el usuario');
      }
    } catch (error) {
      // Manejo de errores en caso de fallos
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  // Método para iniciar sesión en el backend con el token de Firebase
  public firebaseAuth(): Observable<any> {
    const firebaseToken = this.firebaseTokenInMemory;

    if (!firebaseToken) {
      console.error('Token de Firebase no encontrado');
      return of(null);
    }

    const params = new HttpParams().set('token', firebaseToken);

    return this.http
      .post<any>(`${this.apiUrl}public/firebase-login`, {}, { params })
      .pipe(
        tap((response) => {
          console.log('datos del api', response);
          if (response.accessToken && response.refreshToken) {
            localStorage.setItem('refreshToken', response.refreshToken);
            this.accessToken = response.accessToken;
            this.role = response.role;
            console.log('Rol del usuario:', this.role);

            if (this.role === 'ADMIN') {
              this.router.navigateByUrl('/admin/profile');
            } else if (this.role === 'CUSTOMER') {
              this.router.navigateByUrl('/user/profile');
            } else {
              this.router.navigate(['/']);
            }
          }
        }),
        catchError((error) => {
          console.error('Error al autenticar al usuario:', error);
          return of(null);
        })
      );
  }

  // Método para refrescar el accessToken usando el refreshToken
  public refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      console.error('Refresh token no encontrado');
      return of(null);
    }

    const tokenData = { refreshToken: refreshToken };
    return this.http
      .post<any>(`${this.apiUrl}public/refresh-token`, tokenData)
      .pipe(
        tap((response) => {
          if (response.accessToken) {
            this.accessToken = response.accessToken;
            console.log('AccessToken actualizado:', this.accessToken);
          }
        }),
        catchError((error) => {
          console.error('Error al refrescar el token:', error);
          return of(null);
        })
      );
  }

  // Obtener los detalles del usuario (requiere el accessToken)
  public getUserDetails(): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap((token) => {
        if (!token) {
          throw new Error('Token de acceso no encontrado');
        }

        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        );
        return this.http.get<any>(`${this.apiUrl}user/details-user`, {
          headers,
        });
      }),
      catchError((error) => {
        console.error('Error al obtener detalles del usuario:', error);
        return of(null);
      })
    );
  }

  // Método para recuperar la contraseña
  async recoverPassword(email: string): Promise<any> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      console.log('Correo de recuperación enviado a:', email);
      return { success: true, message: 'Se ha enviado un correo para restablecer la contraseña.' };
    } catch (error) {
      console.error('Error al enviar correo de recuperación:', error);
      return { success: false, message: 'No se pudo enviar el correo de recuperación. Inténtalo nuevamente.' };
    }
  }

}
