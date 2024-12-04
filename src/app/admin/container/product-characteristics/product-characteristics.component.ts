import { Component, OnInit } from '@angular/core';
import { ProductCharacteristicsService } from '../../../service/product-characteristics.service';

@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrl: './product-characteristics.component.css'
})
export class ProductCharacteristicsComponent implements OnInit {
  characteristicName: string = '';
  data: any[] = [];
  selectedCharacteristic: any = null;

  constructor(private productCharacteristicsService: ProductCharacteristicsService) {}

  ngOnInit(): void {
    this.getAllCharacteristics();
  }

  // Método para agregar una nueva característica
  addCharacteristic(characteristic: any): void {
    this.productCharacteristicsService.addCharacteristic(characteristic.characteristicName).subscribe({
      next: (response) => {
        console.log('Registro exitoso. Característica añadida:', response);
        this.getAllCharacteristics();
      },
      error: (error) => {
        console.error('Error en el registro:', error);
      }
    });
  }

  // Método para obtener todas las características
  getAllCharacteristics(): void {
    this.productCharacteristicsService.getAllCharacteristics().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (error) => console.error('Error al obtener características:', error)
    });
  }

  editCharacteristic(item: any): void {
    // Guardar los datos de la característica seleccionada en `selectedCharacteristic`
    this.selectedCharacteristic = { ...item };  
    console.log('Característica seleccionada para editar:', this.selectedCharacteristic);  // Verificar que los datos están correctos
  }
  

  updateCharacteristic(updatedCharacteristic: any): void {
    console.log('ID de la característica:', updatedCharacteristic.characteristicId); 
    console.log('Nombre de la característica:', updatedCharacteristic.characteristicName);  
  
    this.productCharacteristicsService
      .updateCharacteristic(updatedCharacteristic.characteristicId, updatedCharacteristic.characteristicName)
      .subscribe({
        next: (response) => {
          console.log('Característica actualizada:', response);
          this.getAllCharacteristics();
          this.selectedCharacteristic = null;
        },
        error: (error) => console.error('Error al actualizar la característica:', error)
      });
  }
}