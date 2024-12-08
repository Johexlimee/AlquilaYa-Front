import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthcontrollerService } from '../../../service/authcontroller.service';

@Component({
  selector: 'app-supplier-header',
  templateUrl: './supplier-header.component.html',
  styleUrl: './supplier-header.component.css'
})
export class SupplierHeaderComponent {
  @Input() isSidebarCollapsed: boolean = false; // Recibe el estado del sidebar desde el padre
  @Output() toggleSidebar = new EventEmitter<void>(); // Emite eventos al padre

  constructor(private authService: AuthcontrollerService) {}
  // Método para emitir el evento
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

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