import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-characteristics-value-modal',
  templateUrl: './product-characteristics-value-modal.component.html',
  styleUrl: './product-characteristics-value-modal.component.css'
})
export class ProductCharacteristicsValueModalComponent {

@Input() modalId: string = 'createModal';
@Input() isEditing: boolean = false;
@Input() initialData: any = { product: '', productCharacteristic: '', value: '' };
@Output() submitForm = new EventEmitter<any>();

formData = { product: '', productCharacteristic: '', value: ''  };
formError: string | null = null;
loading: boolean = false;

constructor(private cdRef: ChangeDetectorRef) {}

ngOnChanges() {
  this.formData = { ...this.initialData };
  this.cdRef.detectChanges();
}

handleSubmit() {
  if (!this.formData.product.trim() ||!this.formData.productCharacteristic.trim() ||!this.formData.value.trim() ) {
    this.formError = 'El nombre es obligatorio.';
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
