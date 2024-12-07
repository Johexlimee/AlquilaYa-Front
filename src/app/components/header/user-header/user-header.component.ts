import { Component } from '@angular/core';
import { AuthcontrollerService } from '../../../service/authcontroller.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {

  constructor(private authService: AuthcontrollerService) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        if (response.success) {
          console.log(response.message);
        } else {
          console.error(response.message);
        }
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      },
      complete: () => {
        console.log('Cierre de sesión completado');
      }
    });
  
  }
}
