import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { CategoriesService } from '../../../service/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  dataCategories: any = [];
  products: any[] = [];
  name: string ='';
  city:string ='';
  randomProducts: any[] = [];
    cities: string[] = [
      'Bogota', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 
      'Bucaramanga', 'Cúcuta', 'Pereira', 'Santa Marta', 'Ibagué', 
      'Manizales', 'Villavicencio', 'Pasto', 'Neiva', 'Armenia', 
      'San Andrés', 'Popayán', 'Montería', 'Sincelejo', 'Tunja'
    ];



    tarjetas: { img: string, titulo: string, descripcion: string }[] = [];
    tarjetasPedir = [
      { img: '/buscar.png', titulo: '1. Buscar', descripcion: 'Encuentre un producto cerca de usted' },
      { img: '/VERIFICAR-LAS-FUENTES.png', titulo: '2. Verificar', descripcion: 'Verifique su perfil para convertirse en miembro' },
      { img: 'reservar.jpg', titulo: '3. Reservar', descripcion: 'Envía una solicitud a tu vecino y reserva' },
      { img: '/aprovchar.png', titulo: '4. Aprovechar', descripcion: 'Utiliza  y devuélvelo en el tiempo acordado' }
    ];
    tarjetasPrestar = [
      { img: '/ofrecer.jpg', titulo: '1. Ofrecer', descripcion: 'Publica un producto para compartir' },
      { img: '/aceptar4.jpg', titulo: '2. Aceptar', descripcion: 'Revisa y acepta las solicitudes de reserva' },
      { img: '/entregar4.jpg', titulo: '3. Entregar', descripcion: 'Entrega el producto al solicitante' },
      { img: '/recibir.jpg', titulo: '4. Recibir', descripcion: 'Recibe el producto y verifica que esté en buen estado' }
    ];
  constructor(private productService: ProductService,  private categoriesService: CategoriesService){}

ngOnInit(): void {
this.getAllProducts();
this.getAllCategories()
this.mostrarPedir();
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
      this.getRandomProducts(6);
    },
    error: (error) => console.log(error),
    complete: () => {
      console.log("Búsqueda completada");
      // Ya no es necesario vaciar los productos aquí
    }
  });
}
  groupedCategories(): any[] {
  const groupSize = 3; 
  const groups = [];
  for (let i = 0; i < this.dataCategories.length; i += groupSize) {
    groups.push(this.dataCategories.slice(i, i + groupSize));
  }
  return groups;
}

getRandomProducts(count: number): void {
  if (this.products.length <= count) {
    this.randomProducts = [...this.products]; 
  } else {
    const shuffled = [...this.products].sort(() => 0.5 - Math.random()); 
    this.randomProducts = shuffled.slice(0, count); 
  }
  console.log("Productos aleatorios seleccionados:");
  console.log(this.randomProducts);
}

mostrarPedir() {
  this.tarjetas = this.tarjetasPedir;
}

mostrarPrestar() {
  this.tarjetas = this.tarjetasPrestar;
}
  
}
