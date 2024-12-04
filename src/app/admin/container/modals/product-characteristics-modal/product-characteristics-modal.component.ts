import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

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

  // Detectar cambios en las entradas
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.formData = { ...this.initialData };
    }
  }

  // Manejar el envío del formulario
  handleSubmit(): void {
    if (!this.formData.characteristicName.trim()) {
      this.formError = 'El nombre es obligatorio.';
      return;
    }

    this.formError = null;
    this.loading = true;

    // Simular una operación asíncrona
    setTimeout(() => {
      this.submitForm.emit(this.formData); // Emitir los datos al componente principal
      this.loading = false;
      this.resetForm(); // Reiniciar el formulario después del envío
    }, 1000);
  }

  // Reiniciar el formulario
  resetForm(): void {
    this.formData = { characteristicName: '' };
    this.formError = null;
  }
}
