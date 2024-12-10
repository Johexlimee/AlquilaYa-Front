import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { AuthcontrollerService } from './authcontroller.service';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';

interface OrderDetail {
  orderDetailId: number,
  userId: number,
  quantity: number,
  orderId: number,
  startDate: Date,
  endDate: Date,
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

  public addOrderDetail(
    startDate: Date,
    endDate: Date,
    quantity: number,
    productId: number,
  ): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap((token)=> {
        if (!token) {
          throw new Error('Token de acceso no encontrado');
        }
        const userId = this.authService.decodeTokenAndGetUserId(token);
        console.log(userId);
        if (!userId) {
          throw new Error('No se pudo obtener el userId del token');
        }
        const registerData = {
          startDate, endDate, quantity, product: { productId: productId },
        };
        console.log("Datos guardados", registerData);
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(`${this.apiUrl}order-details/add?userID=${userId}`, registerData, { headers });
      }),
      tap((response) => {
        if (response) {
          console.log("Producto agregado:", response);
        } else {
          this.alertService.showError('No se pudo agregar el producto. Inténtalo de nuevo.');
        }
      }),
      catchError((error) => {
        console.error('Error al agregar el producto:', error);
        return of(null);
      })
    );
  }

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
