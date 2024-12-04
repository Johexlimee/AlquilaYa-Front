import { Component } from '@angular/core';
import { ProductCharacteristicsService } from '../../../service/product-characteristics.service';

@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrl: './product-characteristics.component.css'
})
export class ProductCharacteristicsComponent {
  characteristicName: string = '';
  
  data: any;
  showPassword: boolean = false;
  constructor(private productCharacteristicsService: ProductCharacteristicsService,private consume: ProductCharacteristicsService) {}
  
  register(): void {
    this.productCharacteristicsService.addCharacteristic(this.characteristicName).subscribe({
      next: (characteristicId) => {
        console.log('Registro exitoso. userId:', characteristicId);
      },
      error: (error) => {
        console.error('Error en el registro', error);
      }
    });
}

getAllCharacteristics(): void {
  this.consume.getAllCharacteristics().subscribe({
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
  this.getAllCharacteristics();
}
}