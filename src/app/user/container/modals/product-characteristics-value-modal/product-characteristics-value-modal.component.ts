import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCharacteristicsService } from '../../../../service/product-characteristics.service';

@Component({
  selector: 'app-product-characteristics-value-modal',
  templateUrl: './product-characteristics-value-modal.component.html',
  styleUrls: ['./product-characteristics-value-modal.component.css']
})
export class ProductCharacteristicsValueModalComponent {
  dataProductChara: any = [];
  @Input() modalId: string = 'createModal';
  @Input() isEditing: boolean = false;
  @Input() initialData: any = { product: '', productCharacteristic: '', value: '' };
  @Output() submitForm = new EventEmitter<any>();

  formData = { product: '', productCharacteristic: '', value: '' };
  formError: string | null = null;
  loading: boolean = false;

  constructor(
    private productCharaService: ProductCharacteristicsService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnChanges() {
    this.formData = { ...this.initialData };
    this.getAllCaracteristics();
    this.cdRef.detectChanges();
  }

  getAllCaracteristics(): void {
    this.productCharaService.getAllCharacteristics().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.dataProductChara = data;
      },
      error: (error) => console.error('Error al obtener características:', error),
      complete: () => {
        console.log('Carga de características completada.');
      },
    });
  }

 handleSubmit() {
    // Validar que todos los campos estén completos
    if ( 
        !this.formData.productCharacteristic?.trim() || 
        !this.formData.value?.trim()) {
      return;
    }

    // Limpiar error previo y activar el estado de carga
    this.formError = null;
    this.loading = true;

    setTimeout(() => {
      // Emitir datos y resetear estado
      this.submitForm.emit(this.formData);
      this.loading = false;
    }, 1000);
  }
}
