import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCharacteristicsService } from '../../../../service/product-characteristics.service';

@Component({
  selector: 'app-product-characteristics-value-modal',
  templateUrl: './product-characteristics-value-modal.component.html',
  styleUrl: './product-characteristics-value-modal.component.css'
})
export class ProductCharacteristicsValueModalComponent {
  dataProductChara: any = [];
  @Input() modalId: string = 'createModal';
  @Input() isEditing: boolean = false;
  @Input() initialData: any = { product: '', productCharacteristic: '', value: '' };
  @Output() submitForm = new EventEmitter<any>();

formData = { product: '', productCharacteristic: '', value: ''  };
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
      console.log('holaa ingreso');
      console.log(data);
      this.dataProductChara = data;
    },
    error: (error) => console.log(error),
    complete: () => {
      console.log('Se completó');
    },
  })
}

handleSubmit() {
  if (!this.formData.product.trim() ||!this.formData.productCharacteristic.trim() ||!this.formData.value.trim() ) {
    return;
  }

  this.loading = true;
  setTimeout(() => {
    this.submitForm.emit(this.formData);
    this.loading = false;
    this.formError = null;  // Resetear error después del envío
  }, 1000);
}
}