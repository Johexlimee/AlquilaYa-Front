import { Component, OnInit } from '@angular/core';
import { AuthcontrollerService } from '../../../service/authcontroller.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AlertService } from '../../../service/alert.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private authService: AuthcontrollerService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.loginForm = new FormGroup({
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

  ngOnInit(): void {
    // Si el usuario ya está autenticado, redirigirlo automáticamente.
    if (this.authService.isLoggedIn()) {
      this.authService.firebaseAuth().subscribe((response) => {
        if (response) {
          this.alertService.showSuccess('Operación realizada con éxito.');
        }
      });
    }
  }

  // Cambiar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
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

  // Método de inicio de sesión con correo y contraseña
  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      this.alertService.showError('Por favor, completa todos los campos correctamente.');
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Validación adicional para el formato de email
    if (!this.isValidEmail(email)) {
      this.alertService.showError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      const result = await this.authService.loginWithEmail(email, password);
      console.log('Inicio de sesión exitoso:', result);
      if(result != null){
        this.alertService.showSuccess('Operación realizada con éxito.');
      }
      this.alertService.showError('Error al iniciar sesión. Verifica tus credenciales.');
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
