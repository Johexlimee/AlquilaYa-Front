import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any;
  tarjetas: { img: string, titulo: string, descripcion: string }[] = [];
  tarjetasPedir = [
    { img: '/buscar.png', titulo: '1. Buscar', descripcion: 'Encuentre un producto cerca de usted' },
    { img: '/VERIFICAR-LAS-FUENTES.png', titulo: '2. Verificar', descripcion: 'Verifique su perfil para convertirse en miembro' },
    { img: 'reservar.jpg', titulo: '3. Reservar', descripcion: 'Envía una solicitud a tu vecino y reserva' },
    { img: '/aprovchar.png', titulo: '4. Aprovechar', descripcion: 'Utiliza el producto y devuélvelo en el tiempo acordado' }
  ];
  tarjetasPrestar = [
    { img: '/ofrecer.jpg', titulo: '1. Ofrecer', descripcion: 'Publica un producto para compartir' },
    { img: '/aceptar4.jpg', titulo: '2. Aceptar', descripcion: 'Revisa y acepta las solicitudes de reserva' },
    { img: '/entregar4.jpg', titulo: '3. Entregar', descripcion: 'Entrega el producto al solicitante' },
    { img: '/recibir.jpg', titulo: '4. Recibir', descripcion: 'Recibe el producto y verifica que esté en buen estado' }
  ];

  constructor(private consume: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.mostrarPedir();  // Mostrar las tarjetas de "Pedir" por defecto
  }

  // Método para obtener los productos
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

  // Métodos para alternar entre tarjetas
  mostrarPedir() {
    this.tarjetas = this.tarjetasPedir;
  }

  mostrarPrestar() {
    this.tarjetas = this.tarjetasPrestar;
  }
}

