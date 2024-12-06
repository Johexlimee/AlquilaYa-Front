import { Component } from '@angular/core';
import { AuthcontrollerService } from '../../../service/authcontroller.service';
import { TypeDocumentService } from '../../../service/type-document.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  typeDocumentId: number = 1;  
  documentNumber: string = '';
  data: any;
  showPassword: boolean = false;
  constructor(private authService: AuthcontrollerService,private consume: TypeDocumentService) {}
  

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
  }



  getAllTypeDocument(): void {
    this.consume.getAllTypeDocuments().subscribe({
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
    this.getAllTypeDocument();
  }

  
}
