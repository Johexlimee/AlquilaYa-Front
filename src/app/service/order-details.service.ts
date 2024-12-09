import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { AuthcontrollerService } from './authcontroller.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

interface OrderDetail {
  orderDetailId: number,
  quantity: number,
  orderId: number,
  productId: number,
}

@Injectable({
  providedIn: 'root'
})

export class OrderDetailsService {
  private apiUrl: string = 'http://localhost:8080/api/v1/';

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private alertService: AlertService, 
    private authService: AuthcontrollerService,
  ) { }

  //Metodo para obtener todos los detalles de ordenes
  public getAllOrderDetails (): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}order-details/user/orderdetail-all`);
  }

  public getAllProductsInCart(): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap((token)=> {
        if (!token) {
          throw new Error('Token de acceso no encontrado');
        }
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(`${this.apiUrl}order-details/order/userId`, { headers });
      }),
      catchError((error)=>{
        console.error('Error al obtener los productos:', error);
        return throwError(() => new Error('No se pudo obtener los productos. Inténtalo de nuevo más tarde.'));
      })
    );
  }
}
