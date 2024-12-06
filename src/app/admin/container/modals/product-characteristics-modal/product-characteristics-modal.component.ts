import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-characteristics-modal',
  templateUrl: './product-characteristics-modal.component.html',
  styleUrls: ['./product-characteristics-modal.component.css']
})
export class ProductCharacteristicsModalComponent {
  @Input() modalId: string = 'createModal';
  @Input() isEditing: boolean = false;
  @Input() initialData: any = { characteristicName: '' };
  @Output() submitForm = new EventEmitter<any>();

  formData = { characteristicName: '' };
  formError: string | null = null;
  loading: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges() {
    this.formData = { ...this.initialData };
    this.cdRef.detectChanges();
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
      this.formError = null;  // Resetear error después del envío
    }, 1000);
  }
}
