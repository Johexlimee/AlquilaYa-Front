import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from '../../../service/order-details.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  orderDetails: any;
  ngForCount: number = 0;

  constructor (
    private orderDetailsService: OrderDetailsService
  ) {}

  getAllOrderDetails(): void {
    this.orderDetailsService.getAllOrderDetails().subscribe({
      next: (data) => {
        console.log(data);
        this.orderDetails = data;
        this.ngForCount = data.length;
      },
      error: (error) => console.log(error),
      complete: ()=> {
        console.log("se completo");
      }
    });
  }

  ngOnInit(): void {
    this.getAllOrderDetails();
  }
}
