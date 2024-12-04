import { Component } from '@angular/core';
import { CategoriesService } from '../../../service/categories.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css'
})
export class CategoryManagementComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  typeDocumentId: number = 1;  
  documentNumber: string = '';
  data: any;
  showPassword: boolean = false;
  constructor(private categories: CategoriesService,private consume: CategoriesService) {}
  

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
/*  register(): void {
    this.authService.register(this.email, this.password, this.firstName, this.lastName, this.typeDocumentId, this.documentNumber).subscribe({
      next: (userId) => {
        console.log('Registro exitoso. userId:', userId);
      },
      error: (error) => {
        console.error('Error en el registro', error);
      }
    });
  }*/



  getAllCategories(): void {
    this.consume.getAllCategories().subscribe({
      next: (data) => {
        console.log("holaa ingreso");
        console.log(data);
        this.data = data;
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log("Se completó");
      }
    });
  }

 
  ngOnInit(): void {
    this.getAllCategories();
  }

  

}
