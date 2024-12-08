import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { AuthcontrollerService } from './authcontroller.service';
import { catchError, Observable, of } from 'rxjs';


interface ProductCharacteristics {
  productDetailsId: number;
  address: string;
  city: string;
  department: string;
  stock: number;

}
@Injectable({
  providedIn: 'root'
})
export class ProductCharacteristicsValueService {
  private apiUrl: string = 'http://localhost:8080/api/v1/';
  public accessToken: string | null = null;
  constructor(private http: HttpClient, private router: Router,private alertService: AlertService,private authService: AuthcontrollerService) { }

  // Método para obtener todas las características
public getAllProductCharacteristics( productId: number,): Observable<ProductCharacteristics[]> {
  const params = new HttpParams().set('productId', productId.toString())
  return this.http.get<ProductCharacteristics[]>(`${this.apiUrl}product-characteristics-value/public/productId`, {  params }).pipe(
    catchError((error) => {
      console.error('Error al obtener características:', error);
      return of([]);
    })
  );
}
}
