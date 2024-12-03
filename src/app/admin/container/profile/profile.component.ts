import { Component, OnInit } from '@angular/core';
import { AuthcontrollerService } from '../../../service/authcontroller.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userDetailsForm: FormGroup;

  constructor(private fb: FormBuilder,private consume: AuthcontrollerService) {
    this.userDetailsForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      birthDate: [''],
      documentNumber: [''],
      bio: [''],
      photo: [''],
      typeDocumentId: [''],
      statusDocument: [''],
      role: ['']
    });
  }


  getUserDetails(): void {
    this.consume.getUserDetails().subscribe({
      next: (data) => {
        this.userDetailsForm.patchValue(data);
      },
      error: (error) => console.error(error),
      complete: () => console.log("Se completó la obtención de datos")
    });
  }
 
  ngOnInit(): void {
    this.getUserDetails();
  }

}
