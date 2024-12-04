import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from './alert.service';
interface Characteristic {
  characteristicId: number;
  characteristicName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductCharacteristicsService {

  private apiUrl: string = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient, private router: Router,private alertService: AlertService) { }

// Método para registrar una nueva característica
public addCharacteristic(characteristicName: string): Observable<Characteristic | null> {
  const characteristicData = { characteristicName };
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Token de acceso no encontrado');
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http
    .post<Characteristic>(`${this.apiUrl}admin/characteristics-add`, characteristicData, { headers })
    .pipe(
      tap((response) => {
        console.log('Respuesta completa del servidor:', response);
        if (response.characteristicId) {
          console.log('Registro exitoso:', response);
          this.alertService.showSuccess('Operación realizada con éxito.');
        }
        console.log('Registro exitoso:', response);
      }),
      catchError((error) => {
        console.error('Error en el registro:', error);
        this.alertService.showError('No se pudo registrar la característica.');
        return of(null);
      })
    );
}


public updateCharacteristic(characteristicId: number, characteristicName: string): Observable<Characteristic | null> {
  const characteristicData = { characteristicId, characteristicName };
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('Token de acceso no encontrado');
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http
    .put<Characteristic>(`${this.apiUrl}admin/characteristics-update?id=${characteristicId}`, characteristicData, { headers })
    .pipe(
      tap((response) => {
        console.log('Actualización:', response);
        if (response.characteristicId) {
          console.log('Actualización exitosa:', response);
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
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }
}