import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { AuthcontrollerService } from './authcontroller.service';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';


interface ProductCharacteristics {
  valueId: number;
  product: string;
  productCharacteristic: string;
  value: number;

}
@Injectable({
  providedIn: 'root'
})
export class ProductCharacteristicsValueService {
  private apiUrl: string = 'http://localhost:8080/api/v1/';
  public accessToken: string | null = null;
  constructor(
    private http: HttpClient, 
    private router: Router,
    private alertService: AlertService,
    private authService: AuthcontrollerService
  ) { }
  
 // Método para registrar 
 public addCharacteristics( value: string,productId: number, characteristicId: number, ): Observable<ProductCharacteristics | null> {

  const registerData = {
    value,
    productCharacteristic: {
      characteristicId: characteristicId
    },
    product: { productId: productId },
  };
  return this.authService.getAccessToken().pipe(
    switchMap((token) => {
      if (!token) {
        throw new Error('Token de acceso no encontrado');
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<ProductCharacteristics>(
        `${this.apiUrl}user/add-charact`,
        registerData,
        { headers }
      );
    }),
    tap((response): void => {
      if (response?.valueId) {
        this.alertService.showSuccess('Operación realizada con éxito.');
      }
    }),
    catchError((error) => {
      console.error('Error en el registro:', error);
      this.alertService.showError('No se pudo registrar.');
      return of(null);
    })
  );
}

// Método para actualizar un detalle de producto existente
public updateProductCharacteristics(valueId: number, value: string,productId: number, characteristicId: number,): Observable<ProductCharacteristics | null> {
  const registerData = {
    valueId,
    value,
    productCharacteristic: {
      characteristicId: characteristicId
    },
    product: { productId: productId },
  };
console.log("data",registerData)
  return this.authService.getAccessToken().pipe(
    switchMap((token) => {
      if (!token) {
        throw new Error('Token de acceso no encontrado');
      }
console.log(valueId)
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const params = new HttpParams().set('id', valueId.toString());
      return this.http.put<ProductCharacteristics>(
        `${this.apiUrl}user/update-charact`,
        registerData,
        { headers,params }
      );
    }),
    tap((response) => {
      if (response?.valueId) {
        this.alertService.showSuccess('El valor se actualizó con éxito.');
      }
    }),
    catchError((error) => {
      console.error('Error en la actualización:', error);
      this.alertService.showError('No se pudo actualizar.');
      return of(null);
    })
  );
}


  // Método para obtener todas las características
  public getAllProductCharacteristics( valueId: number,): Observable<ProductCharacteristics[]> {
    const params = new HttpParams().set('productId', valueId.toString())
    return this.http.get<ProductCharacteristics[]>(`${this.apiUrl}public/charact-productId`, { params }).pipe(
      tap((data) => { 
        console.log('Datos recibidos:', data);
      }),
      catchError((error) => {
        console.error('Error al obtener valor:', error);
        return of([]);
      })
    );
  }
}
