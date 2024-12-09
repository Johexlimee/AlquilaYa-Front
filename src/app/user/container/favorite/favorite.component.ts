import { ChangeDetectorRef, Component } from '@angular/core';
import { FavoriteService } from '../../../service/favorite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { AlertService } from '../../../service/alert.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  favorites: any[] = [];
  products: any[] = [];
  randomProducts: any[] = [];
  favoriteProducts: any[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private alertService: AlertService,
    private favoriteService: FavoriteService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUserFavorites().then(() => {
      this.getAllProducts();
    });
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log('Productos obtenidos:', data);
        this.products = Array.isArray(data) ? data : [];
        this.getRandomProducts(3);
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log('Carga de productos completada');
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
  }

  idProduct(productId: number): void {
    this.router.navigate([`/user/detail/${productId}`]);
    console.log(productId);
  }

  getAllProductsUser(): void {
    this.favoriteService.getUserFavorites().subscribe({
      next: (data) => {
        this.favorites = data;
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log('Se completó');
      }
    });
  }

  // Cargar los favoritos del usuario
  private loadUserFavorites(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.favoriteService.getUserFavorites().subscribe({
        next: (data) => {
          this.favoriteProducts = data.map((fav: any) => ({
            favoriteId: fav.favoriteId,
            productId: fav.productId
          }));
          this.getAllProductsUser();
          resolve();
        },
        error: (error) => {
          console.error('Error loading favorites:', error);
          reject(error);
        }
      });
    });
  }

  // Eliminar favorito
  deleteFavorite(favoriteId: number): void {
    this.favoriteService.removeFavorite(favoriteId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(fav => fav.favoriteId !== favoriteId);

        if (this.favorites.length === 0) {
          this.alertService.showSuccessTop('¡Todos tus favoritos han sido eliminados!');
        } else {
          this.alertService.showSuccessTop('¡Favorito eliminado exitosamente!');
        }

        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Error al eliminar el favorito:', error);
        this.alertService.showSuccessTop('Error al eliminar el favorito');
      }
    });
  }

  // Alternar entre favoritos
  toggleFavorite(productId: number): void {
    const favorite = this.favoriteProducts.find(fav => fav.productId === productId);

    if (favorite) {
      this.favoriteService.removeFavorite(favorite.favoriteId).subscribe({
        next: () => {
          this.favoriteProducts = this.favoriteProducts.filter(fav => fav.productId !== productId);
          this.alertService.showSuccessTop('Producto eliminado de favoritos');
          this.getAllProductsUser();
        },
        error: (error) => console.error('Error removiendo del favorito:', error)
      });
    } else {
      this.favoriteService.addFavorite(productId).subscribe({
        next: (response) => {
          this.favoriteProducts.push({ favoriteId: response.favoriteId, productId });
          this.getAllProductsUser();
          this.alertService.showSuccessTop('Producto agregado a favoritos');
        },
        error: (error) => console.error('Error agregando a favoritos:', error)
      });
    }
  }

  // Comprobar si un producto está en favoritos
  isFavorite(productId: number): boolean {
    return this.favoriteProducts.some(fav => fav.productId === productId);
  }
}
