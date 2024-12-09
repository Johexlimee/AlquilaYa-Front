import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detail-product-modal',
  templateUrl: './detail-product-modal.component.html',
  styleUrl: './detail-product-modal.component.css'
})
export class DetailProductModalComponent {

  @Input() modalId: string = 'createModal';
  @Input() isEditing: boolean = false;
  @Input() initialData: any = { address: '', city: '', department: '',  stock:  '' };
  @Output() submitForm = new EventEmitter<any>();

  formData = { address: '', city: '', department: '',  stock:  ''  };
  formError: string | null = null;
  loading: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges() {
    this.formData = { ...this.initialData };
    this.cdRef.detectChanges();
  }

  handleSubmit() {
    if (!this.formData.address.trim() ||!this.formData.city.trim() ||!this.formData.department.trim() ||!this.formData.stock.trim()) {
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
