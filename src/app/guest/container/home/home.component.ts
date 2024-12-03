import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: any;
  constructor(private consume: ProductService) { }
  getAllProducts(): void {
    this.consume.getAllProducts().subscribe({
      next: (data) => {
        console.log("holaa ingreso");
        console.log(data);
        this.products = data;
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log("Se completó");
      }
    });

  }

  ngOnInit(): void {
    this.getAllProducts();
  }
}