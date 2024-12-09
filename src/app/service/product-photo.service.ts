import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { AuthcontrollerService } from './authcontroller.service';
import { catchError, Observable, of } from 'rxjs';

interface ProductPhoto {
  photoId: number;
  isPrimary: string;
  photoUrl: number;
 

}
@Injectable({
  providedIn: 'root'
})
export class ProductPhotoService {
  private apiUrl: string = 'http://localhost:8080/api/v1/';
  public accessToken: string | null = null;
  constructor(private http: HttpClient, private router: Router,private alertService: AlertService,private authService: AuthcontrollerService) { }

  // Método para obtener todas las características
  public getAllProductPhoto( productId: number,): Observable<ProductPhoto[]> {
    const params = new HttpParams().set('productId', productId.toString())
    return this.http.get<ProductPhoto[]>(`${this.apiUrl}public/photo-productId`, {  params }).pipe(
      catchError((error) => {
        console.error('Error al obtener photo:', error);
        return of([]);
      })
    );
  }

  public postPhoto(formData: FormData, id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}photo-add?id=${id}`, formData).pipe(
      catchError((error) => {
        console.error('Error al agregar una foto:', error);
        return of([]);
      })
    );
  }
}
