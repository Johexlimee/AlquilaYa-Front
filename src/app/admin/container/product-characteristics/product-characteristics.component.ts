import { Component } from '@angular/core';
import { ProductCharacteristicsService } from '../../../service/product-characteristics.service';

@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrl: './product-characteristics.component.css'
})
export class ProductCharacteristicsComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  typeDocumentId: number = 1;  
  documentNumber: string = '';
  data: any;
  showPassword: boolean = false;
  constructor(private productCharacteristicsService: ProductCharacteristicsService,private consume: ProductCharacteristicsService) {}
  

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  register(): void {
    this.authService.register(this.email, this.password, this.firstName, this.lastName, this.typeDocumentId, this.documentNumber).subscribe({
      next: (userId) => {
        console.log('Registro exitoso. userId:', userId);
      },
      error: (error) => {
        console.error('Error en el registro', error);
      }
    });
}}
