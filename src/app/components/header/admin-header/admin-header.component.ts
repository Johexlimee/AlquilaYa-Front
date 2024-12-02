import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  @Input() isSidebarCollapsed: boolean = false; // Recibe el estado del sidebar desde el padre
  @Output() toggleSidebar = new EventEmitter<void>(); // Emite eventos al padre

  // Método para emitir el evento
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

 
}
