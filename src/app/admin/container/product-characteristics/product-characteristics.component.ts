import { Component, OnInit } from '@angular/core';
import { ProductCharacteristicsService } from '../../../service/product-characteristics.service';

@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrls: ['./product-characteristics.component.css']
})
export class ProductCharacteristicsComponent implements OnInit {
  characteristicName: string = '';
  data: any[] = [];
  selectedCharacteristic: any = null;
  searchTerm: string = '';

  constructor(private productCharacteristicsService: ProductCharacteristicsService) {}

  ngOnInit(): void {
    this.getAllCharacteristics();
  }

  // Método para agregar una nueva característica
  addCharacteristic(characteristic: any): void {
    this.productCharacteristicsService.addCharacteristic(characteristic.characteristicName).subscribe({
      next: (response) => {
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
    this.selectedCharacteristic = { ...item };  // Guardar los datos de la característica seleccionada
  }

  updateCharacteristic(updatedCharacteristic: any): void {
    this.productCharacteristicsService.updateCharacteristic(updatedCharacteristic.characteristicId, updatedCharacteristic.characteristicName).subscribe({
      next: (response) => {
        this.getAllCharacteristics();
        this.selectedCharacteristic = null;  // Resetear después de actualizar
      },
      error: (error) => console.error('Error al actualizar la característica:', error)
    });
  }

  // Filtrar características
  get filteredCharacteristics() {
    return this.data.filter(characteristic =>
      characteristic.characteristicName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
