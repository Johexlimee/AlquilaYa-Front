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
    showPassword: boolean = false;
    constructor(private authService: AuthcontrollerService) {}
  

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
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
