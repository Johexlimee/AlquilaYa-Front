import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-supplier-header',
  templateUrl: './supplier-header.component.html',
  styleUrl: './supplier-header.component.css'
})
export class SupplierHeaderComponent {
  @Input() isSidebarCollapsed: boolean = false; // Recibe el estado del sidebar desde el padre
  @Output() toggleSidebar = new EventEmitter<void>(); // Emite eventos al padre

  // Método para emitir el evento
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
