import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-characteristics-modal',
  templateUrl: './product-characteristics-modal.component.html',
  styleUrl: './product-characteristics-modal.component.css'
})
export class ProductCharacteristicsModalComponent {
  @Input() modalId: string = 'createModal';
  @Input() isEditing: boolean = false;
  @Input() initialData: any = { characteristicName: '' };
  @Output() submitForm = new EventEmitter<any>();

  formData = { characteristicName: '' };
  formError: string | null = null;
  loading: boolean = false;

  ngOnChanges() {
    this.formData = { ...this.initialData };
  }

  handleSubmit() {
    if (!this.formData.characteristicName.trim()) {
      this.formError = 'El nombre es obligatorio.';
      return;
    }

    this.loading = true;
    setTimeout(() => {
      this.submitForm.emit(this.formData);
      this.loading = false;
    }, 1000);
  }

}
