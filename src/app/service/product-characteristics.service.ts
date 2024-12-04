import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

interface Characteristic {
  characteristicId: number;
  characteristicName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductCharacteristicsService {

  private apiUrl: string = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient, private router: Router) { }

  // Método para registrar una nueva característica
  public addCharacteristic(characteristicName: string): Observable<Characteristic | null> {
    const characteristicData = { characteristicName };
    
    return this.http
      .post<Characteristic>(`${this.apiUrl}public/register`, characteristicData)
      .pipe(
        tap((response: Characteristic) => {
          if (response.characteristicId) {
            console.log('Registro exitoso:', response);
            this.router.navigateByUrl('/');
          }
        }),
        catchError((error) => {
          console.error('Error en el registro:', error);
          return of(null);  // Devuelve null en caso de error
        })
      );
  }

  // Método para obtener todas las características
  public getAllCharacteristics(): Observable<Characteristic[]> {
    return this.http.get<Characteristic[]>(`${this.apiUrl}public/characteristics-all`).pipe(
      catchError((error) => {
        console.error('Error al obtener características:', error);
        return of([]);  // Retorna un array vacío en caso de error
      })
    );
  }
}
