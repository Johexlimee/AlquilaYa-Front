import { Component } from '@angular/core';
import { AuthcontrollerService } from '../../../service/authcontroller.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  showPassword: boolean = false;
  showcurrentPassword:boolean=false;
  constructor(private authService: AuthcontrollerService) {}


togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}
toggleshowcurrentPasswordVisibility(): void {
  this.showcurrentPassword = !this.showcurrentPassword;
}
}
