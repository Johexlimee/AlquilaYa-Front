import { Component } from '@angular/core';
import { ProductCharacteristicsService } from '../../../service/product-characteristics.service';

@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrl: './product-characteristics.component.css'
})
export class ProductCharacteristicsComponent {
  characteristicName: string = '';
  data: any[] = []; // Definido como un array vacío, ya que lo usas en varias partes
  showPassword: boolean = false;

  selectedCharacteristic: any = null;

  constructor(private productCharacteristicsService: ProductCharacteristicsService) {}

  ngOnInit(): void {
    this.getAllCharacteristics();
  }

  register(): void {
    this.productCharacteristicsService.addCharacteristic(this.characteristicName).subscribe({
      next: (characteristicId) => {
        console.log('Registro exitoso. characteristicId:', characteristicId);
        // Después del registro, puedes llamar nuevamente a getAllCharacteristics para actualizar los datos
        this.getAllCharacteristics();
      },
      error: (error) => {
        console.error('Error en el registro', error);
      }
    });
  }

  getAllCharacteristics(): void {
    this.productCharacteristicsService.getAllCharacteristics().subscribe({
      next: (data) => {
        console.log("Datos obtenidos:", data);
        this.data = data; // Asignando los datos obtenidos del servicio
      },
      error: (error) => console.log('Error al obtener características', error),
      complete: () => {
        console.log("Se completó la solicitud de características.");
      }
    });
  }

  addCharacteristic(characteristic: any): void {
    const newId = this.data.length + 1;
    this.data.push({ characteristicId: newId, ...characteristic });
  }

  editCharacteristic(item: any): void {
    this.selectedCharacteristic = { ...item };
  }

  updateCharacteristic(updatedCharacteristic: any): void {
    const index = this.data.findIndex(
      (item) => item.characteristicId === updatedCharacteristic.characteristicId
    );
    if (index !== -1) {
      this.data[index] = updatedCharacteristic;
    }
  }
}