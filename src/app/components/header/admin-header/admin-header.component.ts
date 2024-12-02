import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar')!;
    sidebar.classList.toggle('collapsed');
  }
}
