import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../service/categories.service';
import { FavoriteService } from '../../../service/favorite.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  products: any[] = [];
  dataCategories: any = [];
  city:string ='';
  name:string ='';
  randomProducts: any[] = [];
  favoriteProducts: any[] = [];
    cities: string[] = [
      'Bogota', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 
      'Bucaramanga', 'Cúcuta', 'Pereira', 'Santa Marta', 'Ibagué', 
      'Manizales', 'Villavicencio', 'Pasto', 'Neiva', 'Armenia', 
      'San Andrés', 'Popayán', 'Montería', 'Sincelejo', 'Tunja'
    ];
  constructor(   private favoriteService: FavoriteService,private productService: ProductService,private router: Router,  private categoriesService: CategoriesService ){}

ngOnInit(): void {
  this.loadUserFavorites()
  .then(() => {
    this.getAllProducts();
  })
this.getAllProducts();
this.getAllCategories()

}

getCategoryProduct(event: Event): void {
  // Casteamos el target del evento a HTMLSelectElement
  const selectElement = event.target as HTMLSelectElement;
  
  // Ahora podemos acceder a `value` correctamente
  const categoryId = selectElement.value;
  
  console.log('Categoría seleccionada:', categoryId);

  if (categoryId != null) {
    // Convertir categoryId a número si es necesario
    const id = Number(categoryId);

    if (!isNaN(id)) {
      this.productService.getCategoryProduct(id).subscribe({
        next: (data) => {
          console.log("Productos encontrados:", data);
          this.products = Array.isArray(data) ? data : [];
        },
        error: (error) => console.log(error),
        complete: () => {
          console.log("Búsqueda completada");
        }
      });
    } else {
      console.log("El ID de la categoría no es válido");
    }
  } else {
    console.log("No se ha seleccionado una categoría válida");
  }
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


getAllCategories(): void {
  this.categoriesService.getAllCategories().subscribe({
    next: (data) => {
      console.log("holaa ingreso");
      console.log(data);
      this.dataCategories = data;
      
    },
    error: (error) => console.log(error),
    complete: () => {
      console.log("Se completó");
    }
  });
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
