import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { AlertService } from './alert.service';
import { AuthcontrollerService } from './authcontroller.service';

interface Order {
  orderId: number;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private apiUrl: string = 'http://localhost:8080/api/v1/';
  public orderId: number = 0; // Nueva propiedad 
  public userId: number = 0; // Nueva propiedad public 

  constructor(
    private http: HttpClient,
    private authService: AuthcontrollerService,
    private alertService: AlertService, 
  ) { }

  public getOrderById(orderId: number): Observable<Order | null> { 
    const token = localStorage.getItem('accessToken'); 
    if (!token) { 
      throw new Error('Token de acceso no encontrado'); 
    } 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 
    return this.http.get<Order>(`${this.apiUrl}order/${orderId}`, { headers }).pipe( 
      tap((response) => { 
        console.log('Orden obtenida del servidor: ', response); 
      }), 
      catchError((error) => { 
        console.error('Error al obtener la orden:', error); 
        this.alertService.showError('No se pudo obtener la orden.'); 
        return of(null); 
      }) 
    ); 
  }

  public completeOrder(orderId: number): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap((token)=> {
        if (!token) {
          throw new Error('Token de acceso no encontrado');
        }
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        console.log("idproduct", orderId);
        return this.http.get(`${this.apiUrl}order-id?id=${orderId}`).pipe(
          tap((response: any) => {
            this.userId = response.userId; 
          }), switchMap(()=> {
            const orderData = {
              userId: this.userId,
            };
            return this.http.put(`${this.apiUrl}complete-order?id=${orderId}`, orderData, { headers });
          }),
          tap((response) => { 
            this.alertService.showSuccess('La orden se ha realizado satisfactoriamente 😍.'); 
          }),
          catchError((error) => { 
            console.error('Error al ordenar los productos', error);
            this.alertService.showError('No se pudo actualizar la orden.');
            return of(null); 
          })
        );
      })
    );
  }
}
