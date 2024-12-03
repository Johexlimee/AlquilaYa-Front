import { Component } from '@angular/core';
import { AuthcontrollerService } from '../../../service/authcontroller.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  data: any; // Tipar la variable 'data' como 'any', aunque sería mejor usar tipos específicos si es posible.

  constructor(private consume: AuthcontrollerService) {}

  // Método para obtener los detalles del usuario
  getUserDetails(): void {
    this.consume.getAllUserDetails().subscribe({
      next: (data) => {
        console.log("holaa ingreso");
        console.log(data);
        this.data = data;
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log("Se completó");
      }
    });
  }

  // Inicializar el componente y obtener los detalles al cargarlo
  ngOnInit(): void {
    this.getUserDetails();
  }

}
