import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCharacteristicsService {

  private apiUrl: string = 'http://localhost:8080/api/v1/';
  constructor(private http: HttpClient, private router: Router) { }

  public addCharacteristic(
    characteristicName: string,
  ): Observable<any> {
    const CharacteristicData = {
      characteristicName
    };
    return this.http
      .post<any>(`${this.apiUrl}public/register`, CharacteristicData)
      .pipe(
        tap((response: { characteristicId: string }) => {
          if (response.characteristicId) {
            this.router.navigateByUrl('/');
          }
        }),
        catchError((error) => {
          console.error('Error en el registro', error);
          return of(null);
        })
      );
  }

  public getAllCharacteristics(): Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}public/characteristics-all`);
  
  
}
}