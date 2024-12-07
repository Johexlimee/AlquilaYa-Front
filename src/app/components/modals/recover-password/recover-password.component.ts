import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthcontrollerService } from '../../../service/authcontroller.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../service/alert.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})
export class RecoverPasswordComponent {
  recoverFrom: FormGroup;
  showPassword: boolean = false;

  constructor(
    private authService: AuthcontrollerService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.recoverFrom = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

    // Método de inicio de sesión con correo y contraseña
    async onRecover(): Promise<void> {
      if (this.recoverFrom.invalid) {
        this.alertService.showError('Por favor, completa todos los campos correctamente.');
        return;
      }
  
      const email = this.recoverFrom.value.email;
  
      // Validación adicional para el formato de email
      if (!this.isValidEmail(email)) {
        this.alertService.showError('Por favor, ingresa un correo electrónico válido.');
        return;
      }
  
      try {
        const result = await this.authService.recoverPassword(email);
          this.alertService.showSuccess('Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.');

      } catch (error) {
        this.alertService.showError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    }
  
    // Método para manejar la autenticación después de un login exitoso (Google/Facebook)
    private handleAuthentication(result: any): void {
      this.authService.firebaseAuth().subscribe({
        next: (response) => {
          if (response) {
            this.router.navigate(['/user']);
          } else {
            this.alertService.showError('Error al autenticar usuario con el backend');
          }
        },
        error: () => {
          this.alertService.showError('Error al autenticar usuario con el backend');
        }
      });
    }
  
    // Método para validar el email
    private isValidEmail(email: string): boolean {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    }

}
