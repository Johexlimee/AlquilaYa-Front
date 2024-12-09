import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  products: any[] = [];
  city:string ='';
  name:string ='';
  randomProducts: any[] = [];
    cities: string[] = [
      'Bogota', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 
      'Bucaramanga', 'Cúcuta', 'Pereira', 'Santa Marta', 'Ibagué', 
      'Manizales', 'Villavicencio', 'Pasto', 'Neiva', 'Armenia', 
      'San Andrés', 'Popayán', 'Montería', 'Sincelejo', 'Tunja'
    ];
  constructor(private productService: ProductService,private router: Router, ){}

ngOnInit(): void {
this.getAllProducts();

}


idProduct(productId: number): void {
  this.router.navigate([`/user/detail/${productId}`]);
  console.log(productId)
}

getAllProducts(): void {
  this.productService.getAllProducts().subscribe({
    next: (data) => {
      console.log("Productos obtenidos:", data);
      // Asegurarse de que los datos sean un array
      this.products = Array.isArray(data) ? data : [];
    },
    error: (error) => console.log(error),
    complete: () => {
      console.log("Carga de productos completada");
    }
  });
}

// Método para hacer la búsqueda de productos por nombre y ciudad
getSearchProduct(name: string, city: string): void {
  this.productService.getSearchProduct(name, city).subscribe({
    next: (data) => {
      console.log("Productos encontrados:", data);
      // Si hay productos encontrados, se reemplazan
      this.products = Array.isArray(data) ? data : [];
    },
    error: (error) => console.log(error),
    complete: () => {
      console.log("Búsqueda completada");
      // Ya no es necesario vaciar los productos aquí
    }
  });
}
}
