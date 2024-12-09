import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { CategoriesService } from '../../../service/categories.service';
import { Router } from '@angular/router';
import { FavoriteService } from '../../../service/favorite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dataCategories: any[] = [];
  products: any[] = [];
  randomProducts: any[] = [];
  favoriteProducts: any[] = [];
  name: string = '';
  city: string = '';

  cities: string[] = [
    'Bogota', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 
    'Cúcuta', 'Pereira', 'Santa Marta', 'Ibagué', 'Manizales', 'Villavicencio', 
    'Pasto', 'Neiva', 'Armenia', 'San Andrés', 'Popayán', 'Montería', 'Sincelejo', 
    'Tunja'
  ];

  tarjetas: { img: string; titulo: string; descripcion: string }[] = [];
  
  tarjetasPedir = [
    { img: '/buscar.png', titulo: '1. Buscar', descripcion: 'Encuentre un producto cerca de usted' },
    { img: '/VERIFICAR-LAS-FUENTES.png', titulo: '2. Verificar', descripcion: 'Verifique su perfil para convertirse en miembro' },
    { img: 'reservar.jpg', titulo: '3. Reservar', descripcion: 'Envía una solicitud a tu vecino y reserva' },
    { img: '/aprovchar.png', titulo: '4. Aprovechar', descripcion: 'Utiliza y devuélvelo en el tiempo acordado' }
  ];

  tarjetasPrestar = [
    { img: '/ofrecer.jpg', titulo: '1. Ofrecer', descripcion: 'Publica un producto para compartir' },
    { img: '/aceptar4.jpg', titulo: '2. Aceptar', descripcion: 'Revisa y acepta las solicitudes de reserva' },
    { img: '/entregar4.jpg', titulo: '3. Entregar', descripcion: 'Entrega el producto al solicitante' },
    { img: '/recibir.jpg', titulo: '4. Recibir', descripcion: 'Recibe el producto y verifica que esté en buen estado' }
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
    private categoriesService: CategoriesService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadUserFavorites()
      .then(() => this.loadAllProducts())
      .finally(() => this.loadAllCategories());

    this.setTarjetas('pedir');
    this.loadAllProducts()
  }

  // Navegar a la vista de detalle de producto
  idProduct(productId: number): void {
    this.router.navigate([`/user/detail/${productId}`]);
  }

  // Cargar categorías
  private loadAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (categories) => this.dataCategories = categories,
      error: (error) => console.error('Error loading categories:', error),
    });
  }

  // Cargar productos
  private loadAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = Array.isArray(products) ? products : [];
        this.setRandomProducts(6);
      },
      error: (error) => console.error('Error loading products:', error),
    });
  }

  // Búsqueda de productos por nombre y ciudad
  getSearchProduct(name: string, city: string): void {
    this.productService.getSearchProduct(name, city).subscribe({
      next: (data) => {
        this.products = Array.isArray(data) ? data : [];
        this.setRandomProducts(6);
      },
      error: (error) => console.error('Error searching products:', error),
    });
  }

  // Agrupar categorías en grupos de tamaño fijo
  groupedCategories(): any[] {
    const groupSize = 3;
    return this.dataCategories.reduce((groups, category, index) => {
      if (index % groupSize === 0) groups.push([]);
      groups[groups.length - 1].push(category);
      return groups;
    }, []);
  }

  // Obtener productos aleatorios
  private setRandomProducts(count: number): void {
    this.randomProducts = this.products.length <= count
      ? [...this.products]
      : this.shuffle(this.products).slice(0, count);
  }

  private shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
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
          resolve();
        },
        error: (error) => {
          console.error('Error loading favorites:', error);
          reject(error);
        },
      });
    });
  }

  // Agregar a favoritos
  addFavorite(productId: number): void {
    this.favoriteService.addFavorite(productId).subscribe({
      next: () => console.log('Producto agregado a favoritos'),
      error: (error) => console.error('Error adding to favorites:', error),
    });
  }

  // Alternar entre tarjetas para "pedir" o "prestar"
  setTarjetas(type: 'pedir' | 'prestar'): void {
    this.tarjetas = type === 'pedir' ? this.tarjetasPedir : this.tarjetasPrestar;
  }

  // Alternar entre favoritos
  toggleFavorite(productId: number): void {
    const favorite = this.favoriteProducts.find(fav => fav.productId === productId);

    if (favorite) {
      this.favoriteService.removeFavorite(favorite.favoriteId).subscribe({
        next: () => {
          this.favoriteProducts = this.favoriteProducts.filter(fav => fav.productId !== productId);
        },
        error: (error) => console.error('Error removing from favorites:', error),
      });
    } else {
      this.favoriteService.addFavorite(productId).subscribe({
        next: (response) => {
          this.favoriteProducts.push({ favoriteId: response.favoriteId, productId });
        },
        error: (error) => console.error('Error adding to favorites:', error),
      });
    }
  }

  // Comprobar si un producto está en favoritos
  isFavorite(productId: number): boolean {
    return this.favoriteProducts.some(fav => fav.productId === productId);
  }
}
