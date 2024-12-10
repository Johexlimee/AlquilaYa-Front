import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { AuthcontrollerService } from './authcontroller.service';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
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


  
 // Método para registrar 
 public addProductDetails( address: string, city: string, department: string,productId:number,  stock: number): Observable<ProductDetail | null> {
  const ProductDetailsData = {  address, city, department, product: { productId: productId },  stock };

  return this.authService.getAccessToken().pipe(
    switchMap((token) => {
      if (!token) {
        throw new Error('Token de acceso no encontrado');
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<ProductDetail>(
        `${this.apiUrl}user/add-details`,
        ProductDetailsData,
        { headers }
      );
    }),
    tap((response): void => {
      if (response?.productDetailsId) {
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
public updateProductDetails(productDetailsId: number, address: string, city: string, department: string,productId:number,  stock: number): Observable<ProductDetail | null> {
  const ProductDetailsData = { productDetailsId, address, city, department, product: { productId: productId },  stock };
console.log("datos productos",ProductDetailsData)
  return this.authService.getAccessToken().pipe(
    switchMap((token) => {
      if (!token) {
        throw new Error('Token de acceso no encontrado');
      }
      const params = new HttpParams().set('id', productDetailsId.toString());
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put<ProductDetail>(
        `${this.apiUrl}user/update-details`,
        ProductDetailsData,
        { headers,params }
      );
    }),
    tap((response) => {
      if (response?.productDetailsId) {
        this.alertService.showSuccess('El detalle del producto se actualizó con éxito.');
      }
    }),
    catchError((error) => {
      console.error('Error en la actualización:', error);
      this.alertService.showError('No se pudo actualizar el detalle del producto.');
      return of(null);
    })
  );
}

  // Método para obtener todos los detalles producto
public getAllProductDetails( productId: number,): Observable<ProductDetail[]> {
  const params = new HttpParams().set('productId', productId.toString())
  return this.http.get<ProductDetail[]>(`${this.apiUrl}public/product-details-id`, {  params }).pipe(
    catchError((error) => {
      console.error('Error al obtener productos:', error);
      return of([]);
    })
  );

}
}
