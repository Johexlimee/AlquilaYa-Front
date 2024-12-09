import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { AuthcontrollerService } from './authcontroller.service';
import { catchError, Observable, switchMap } from 'rxjs';

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
  private apiUrl: string = 'http://localhost:8080/api/v1/'
  public accessToken: string | null = null;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private alertService: AlertService, 
    private authService: AuthcontrollerService
  ) { }

  //Metodo para obtener todos los detalles de ordenes
  public getAllOrderDetails (): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}order-details/user/orderdetail-all`);
  }

}
