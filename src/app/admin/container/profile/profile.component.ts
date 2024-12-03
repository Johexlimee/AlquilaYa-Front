import { Component } from '@angular/core';
import { AuthcontrollerService } from '../../../service/authcontroller.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  data: any; 

  constructor(private consume: AuthcontrollerService) {}


  getUserDetails(): void {
    this.consume.getAllUserDetails().subscribe({
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
    this.getUserDetails();
  }

}
