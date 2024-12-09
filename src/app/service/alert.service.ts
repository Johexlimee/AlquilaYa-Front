import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  showInfo(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor() {}

  // Método genérico para mostrar una alerta
  showAlert(options: SweetAlertOptions) {
    Swal.fire({
      ...options,
      confirmButtonColor: '#2e8b57',
      cancelButtonColor: '#2e8b57'
    });
  }

  // Método para mostrar alertas de éxito
  showSuccess(message: string, title: string = '¡Éxito!') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#2e8b57',
      confirmButtonText: 'Aceptar'
    });
  }

  // Método para mostrar alertas de error
  showError(message: string, title: string = '¡Error!') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonColor: '#2e8b57',
      confirmButtonText: 'Aceptar'
    });
  }

  // Método para mostrar una alerta de confirmación
  showConfirmation(message: string, title: string = '¿Estás seguro?') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2e8b57',
      cancelButtonColor: '#2e8b57',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    });
  }

  showSuccessTop( title: string = '¡Éxito!'){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  }
}
