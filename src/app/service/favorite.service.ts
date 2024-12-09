import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { AuthcontrollerService } from './authcontroller.service';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

interface Favorite {
  favoriteId: number;
  productId: number;
  userId: number;
  name: string;
  description: string;
  price: number;
  isAvailable: number;
  productCondition: string;
  status: number;
  categoryName: string;
  supplierName: string;
  primaryPhotoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl: string = 'http://localhost:8080/api/v1/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthcontrollerService,
    private alertService: AlertService, 
  ) {}

  // Método para obtener todos los favoritos públicos
  public getAllFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.apiUrl}public/favorites`).pipe(
      catchError((error) => {
        console.error('Error al obtener favoritos públicos:', error);
        return of([]);
      })
    );
  }

  // Método para obtener los favoritos del usuario autenticado
  public getUserFavorites(): Observable<Favorite[]> {
    return this.authService.getAccessToken().pipe(
      switchMap((token) => {
        if (!token) {
          throw new Error('Token de acceso no encontrado');
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<Favorite[]>(`${this.apiUrl}customer/favorite-user`, { headers });
      }),
      catchError((error) => {
        console.error('Error al obtener los favoritos del usuario:', error);
        return throwError(() => new Error('No se pudo obtener los favoritos. Inténtalo de nuevo más tarde.'));
      })
    );
  }

  // Método para agregar un favorito

  public addFavorite(
    productId: number,
  ): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap((token) => {
        if (!token) {
          throw new Error('Token de acceso no encontrado');
        }
  
        // Decodificar el userId desde el token
        const userId = this.authService.decodeTokenAndGetUserId(token);
        if (!userId) {
          throw new Error('No se pudo obtener el userId del token');
        }
  
        const registerData = {
          product: {
            productId: productId
          },
          user: {
             userId: userId 
          }
        };
  
        console.log("register", registerData);
  
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        
        return this.http.post<{ favoriteId: number }>(
          `${this.apiUrl}user/favorite-add`,
          registerData,
          { headers }
        );
      }),
      tap((response) => {
       
        if (response && response.favoriteId) {
          console.log("Producto agregado:", response);
        } else {
          // Si la respuesta no contiene un productId, mostrar un mensaje de error
          this.alertService.showError('No se pudo agregar el producto. Inténtalo de nuevo.');
        }
      }),
      catchError((error) => {
        console.error('Error al agregar el producto:', error);
        return of(null);
      })
    );
  }
  

  // Método para eliminar un favorito
  public removeFavorite(favoriteId: number): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap((token) => {
        if (!token) {
          throw new Error('Token de acceso no encontrado');
        }

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete<any>(`${this.apiUrl}customer/remove-favorite/${favoriteId}`, { headers });
      }),
      catchError((error) => {
        console.error('Error al eliminar favorito:', error);
        return throwError(() => new Error('No se pudo eliminar el favorito. Inténtalo de nuevo más tarde.'));
      })
    );
  }

}
