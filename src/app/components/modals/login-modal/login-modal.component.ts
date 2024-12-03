import { Component } from '@angular/core';
import { AuthcontrollerService } from '../../../service/authcontroller.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {

    email: string = '';
    password: string = '';
  
    constructor(private authService: AuthcontrollerService) {}
  
    login(): void {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log('Login exitoso', this.email);
        },
        error: (error) => {
          console.error('Error en el login', error);
        }
      });
    }
  }
