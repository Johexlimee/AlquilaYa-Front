import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from '../../../service/order-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  orderDetails: any;
  ngForCount: number = 0;
  totalCost: number = 0;
  orderId: number = 0;
  userId: number = 0

  constructor (
    private orderDetailsService: OrderDetailsService,
    private orderService: OrderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllProductsInCart();
  }

  getAllProductsInCart(): void {
    this.orderDetailsService.getAllProductsInCart().subscribe({
      next: (data) => {
        console.log("holaa ingreso");
        console.log(data);
        this.orderDetails = data;
        this.ngForCount = data.length;
        this.calculateTotalCost();
        this.orderId = this.orderDetails.length > 0 ? this.orderDetails[0].orderId : 0;
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log("Se completó");
      }
    });
  }

  calculateTotalCost(): void { 
    this.totalCost = this.orderDetails.reduce((acc: number, item: any) => acc + (item.product.price * item.quantity), 0); 
  }

  completeOrder(order: number): void {
    console.log('Ordenando productos para el pedido con ID:', order);
    this.orderService.completeOrder(order).subscribe({
      next:(response)=>{
        console.log('Respuesta del servicio de orden:', response);
        this.getAllProductsInCart();
      },
      error: (error)=> console.error('Error al ordenar los productos', error)
    })
  }

  idProduct(productId: number): void {
    this.router.navigate([`/user/detail/${productId}`]);
    console.log(productId)
  }
  
}
