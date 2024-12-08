import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { AuthcontrollerService } from './authcontroller.service';
import { catchError, Observable, of } from 'rxjs';

interface ProductDetail {
  productDetailsId: number;
  address: string;
  city: string;
  department: string;
  stock: number;

}
@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private apiUrl: string = 'http://localhost:8080/api/v1/';
  public accessToken: string | null = null;
  constructor(private http: HttpClient, private router: Router,private alertService: AlertService,private authService: AuthcontrollerService) { }

  // Método para obtener todas las características
public getAllProductDetails( productId: number,): Observable<ProductDetail[]> {
  const params = new HttpParams().set('productId', productId.toString())
  return this.http.get<ProductDetail[]>(`${this.apiUrl}public/product-details-id`, {  params }).pipe(
    catchError((error) => {
      console.error('Error al obtener características:', error);
      return of([]);
    })
  );
}
}
