import { Component } from '@angular/core';

@Component({
  selector: 'app-supplier-layout',
  templateUrl: './supplier-layout.component.html',
  styleUrl: './supplier-layout.component.css'
})
export class SupplierLayoutComponent {
  isSidebarCollapsed = false; // Estado del sidebar

  onToggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
