import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: any;
    cities: string[] = [
      'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 
      'Bucaramanga', 'Cúcuta', 'Pereira', 'Santa Marta', 'Ibagué', 
      'Manizales', 'Villavicencio', 'Pasto', 'Neiva', 'Armenia', 
      'San Andrés', 'Popayán', 'Montería', 'Sincelejo', 'Tunja'
    ];
  constructor(private productService: ProductService, ){}

ngOnInit(): void {
this.getAllProducts();

}


  getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log("Se completó");
      }
    });
  }

}
