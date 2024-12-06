import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {
  link:String;
  apiKey:String;
  lugar:String;

  constructor(){
    this.apiKey = "AIzaSyBI5jgmZQB_p68Qge2QgLOaQ-m3mjXJOZk";
    this.lugar = "Uniempresarial"
    this.link = "https://www.google.com/maps/embed/v1/place?key=" + this.apiKey + "&q" + this.lugar ;
  }
}
