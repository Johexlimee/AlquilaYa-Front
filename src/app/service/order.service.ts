import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from './alert.service';

interface Order {
  orderId: number;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private apiUrl: string = 'http://localhost:8080/api/v1/';
  
  constructor(
    private http: HttpClient,
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

  public completeOrder(orderId: number, userId: number): Observable<Order|null> {
    const orderData = { userId };
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Token de acceso no encontrado');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Order>(`${this.apiUrl}complete-order?id=${orderId}`, orderData, { headers }).pipe(
      tap((response)=> {
        console.log('Respuesta completa del servidor: ', response);
        if (response && response.orderId) {
          console.log('Registro exitoso: ', response);
          this.alertService.showSuccess('Compra realizada con exito.');
        }
      }),
      catchError((error) => {
        console.error('Error en el registro:', error);
        this.alertService.showError('No se pudo registrar la categoría.');
        return of(null);
      })
    );
  }
}
