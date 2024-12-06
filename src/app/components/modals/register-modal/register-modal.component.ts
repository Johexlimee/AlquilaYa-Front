import { Component } from '@angular/core';
import { AuthcontrollerService } from '../../../service/authcontroller.service';
import { TypeDocumentService } from '../../../service/type-document.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../service/alert.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {
  registerForm: FormGroup;
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthcontrollerService, private alertService: AlertService) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  

  async onRegister() {
    if (this.registerForm.invalid) {
      this.alertService.showError('Por favor, completa todos los campos correctamente.');
      return;
    }

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    // Validación adicional para el formato de email
    if (!this.isValidEmail(email)) {
      this.alertService.showError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      const result = await this.authService.registerWithEmail(email, password);
      console.log('Inicio de sesión exitoso:', result);
      if(result != null){
        this.alertService.showSuccess('Operación realizada con éxito.');
      }
      this.alertService.showError('Error al iniciar sesión. Verifica tus credenciales.');
    } catch (error) {
      this.alertService.showError('Error al iniciar sesión. Verifica tus credenciales.');
    }

  
  }

  // Iniciar sesión con Google
  loginWithGoogle(): void {
    this.authService.loginWithGoogle().then((result) => {
      this.handleAuthentication(result);
    }).catch((error) => {
      this.alertService.showError('Error al autenticar con Google. Inténtalo nuevamente.');
    });
  }

  // Iniciar sesión con Facebook
  loginWithFacebook(): void {
    this.authService.loginWithFacebook().then((result) => {
      this.handleAuthentication(result);
    }).catch((error) => {
      this.alertService.showError('Error al autenticar con Facebook. Inténtalo nuevamente.');
    });
  }

    // Método para manejar la autenticación después de un login exitoso (Google/Facebook)
    private handleAuthentication(result: any): void {
      this.authService.firebaseAuth().subscribe({
        next: (response) => {
          if (response) {
            this.alertService.showSuccess('Error al autenticar usuario con el backend');
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
