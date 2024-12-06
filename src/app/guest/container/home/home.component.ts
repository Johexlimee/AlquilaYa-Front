import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { CategoriesService } from '../../../service/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataCategories: any = [];
  products: any;
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

  chunkedCategories: any[] = [];  // Aquí almacenaremos los bloques de 5 categorías

  constructor( private productService: ProductService, 
    private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.mostrarPedir(); 
    this.getAllCategories();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
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

  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        console.log("holaa ingreso");
        console.log(data);
        this.dataCategories = data;
        this.chunkedCategories = this.chunkArray(data, 5);  // Dividimos las categorías en bloques de 5
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log("Se completó");
      }
    });
  }

  // Método para dividir un array en bloques
  chunkArray(array: any[], size: number): any[] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  mostrarPedir() {
    this.tarjetas = this.tarjetasPedir;
  }

  mostrarPrestar() {
    this.tarjetas = this.tarjetasPrestar;
  }
}
