import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {
  apiKey:String;

  constructor(){
    this.apiKey = "AIzaSyBI5jgmZQB_p68Qge2QgLOaQ-m3mjXJOZk&q";
  }
}
