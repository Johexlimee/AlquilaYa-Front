import { Component } from '@angular/core';
import { FavoriteService } from '../../../service/favorite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  favorites:any;
  products: any[] = [];
  randomProducts: any[] = [];
  constructor( private favoriteService: FavoriteService,private productService: ProductService,private router: Router,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getAllProductsUser();
    this.getAllProducts()
   
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log("Productos obtenidos:", data);
        // Asegurarse de que los datos sean un array
        this.products = Array.isArray(data) ? data : [];
        this.getRandomProducts(3);
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log("Carga de productos completada");
      }
    });
  }

  getRandomProducts(count: number): void {
    if (this.products.length <= count) {
      this.randomProducts = [...this.products];
    } else {
      const shuffled = [...this.products].sort(() => 0.5 - Math.random());
      this.randomProducts = shuffled.slice(0, count);
    }
    console.log('Productos aleatorios seleccionados:');
    console.log(this.randomProducts);
  }

  idProduct(productId: number): void {
    this.router.navigate([`/user/detail/${productId}`]);
    console.log(productId)
  }

  getAllProductsUser(): void {
    this.favoriteService.getUserFavorites().subscribe({
      next: (data) => {
        console.log("holaa ingreso");
        console.log(data);
        this.favorites = data;
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log("Se completó");
      }
    });
  }
}
