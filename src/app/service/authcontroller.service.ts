import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root',
})
export class AuthcontrollerService {
  private apiUrl: string = 'http://localhost:8080/api/v1/';
  private accessToken: string | null = null;
  private role: string | null = null;
  constructor(private http: HttpClient, private router: Router,private alertService: AlertService) {}

  showSuccessAlert() {
    this.alertService.showSuccess('Operación realizada con éxito.');
  }

  showErrorAlert() {
    this.alertService.showError('Algo salió mal.');
  }

  public login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiUrl}public/login`, loginData).pipe(
      tap(
        (response: {
          accessToken: string;
          refreshToken: string;
          role: string;
        }) => {
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
        }
      )
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
}  
