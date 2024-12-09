import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { AlertService } from './alert.service';
import { AuthcontrollerService } from './authcontroller.service';
interface Characteristic {
  characteristicId: number;
  characteristicName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductCharacteristicsService {

  private apiUrl: string = 'http://localhost:8080/api/v1/';
  public accessToken: string | null = null;
  constructor(private http: HttpClient, private router: Router,private alertService: AlertService,private authService: AuthcontrollerService) { }

 // Método para registrar una nueva característica
 public addCharacteristic(characteristicName: string): Observable<Characteristic | null> {
  const characteristicData = { characteristicName };

  return this.authService.getAccessToken().pipe(
    switchMap((token) => {
      if (!token) {
        throw new Error('Token de acceso no encontrado');
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<Characteristic>(
        `${this.apiUrl}admin/characteristics-add`,
        characteristicData,
        { headers }
      );
    }),
    tap((response): void => {
      if (response?.characteristicId) {
        this.alertService.showSuccess('Operación realizada con éxito.');
      }
    }),
    catchError((error) => {
      console.error('Error en el registro:', error);
      this.alertService.showError('No se pudo registrar la característica.');
      return of(null);
    })
  );
}

// Método para actualizar una característica existente
public updateCharacteristic(characteristicId: number, characteristicName: string): Observable<Characteristic | null> {
  const characteristicData = { characteristicId, characteristicName };

  return this.authService.getAccessToken().pipe(
    switchMap((token) => {
      if (!token) {
        throw new Error('Token de acceso no encontrado');
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put<Characteristic>(
        `${this.apiUrl}admin/characteristics-update?id=${characteristicId}`,
        characteristicData,
        { headers }
      );
    }),
    tap((response) => {
      if (response?.characteristicId) {
        this.alertService.showSuccess('La característica se actualizó con éxito.');
      }
    }),
    catchError((error) => {
      console.error('Error en la actualización:', error);
      this.alertService.showError('No se pudo actualizar la característica.');
      return of(null);
    })
  );
}

// Método para obtener todas las características
public getAllCharacteristics(): Observable<Characteristic[]> {
  return this.http.get<Characteristic[]>(`${this.apiUrl}public/characteristics-all`).pipe(
    catchError((error) => {
      console.error('Error al obtener características:', error);
      return of([]);
    })
  );
}

}