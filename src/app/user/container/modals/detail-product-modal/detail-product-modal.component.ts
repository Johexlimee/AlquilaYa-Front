import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-product-modal',
  templateUrl: './detail-product-modal.component.html',
  styleUrl: './detail-product-modal.component.css'
})
export class DetailProductModalComponent {
  @Input() modalId: string = 'createModal';
  @Input() isEditing: boolean = false;
  @Input() initialData: any = {
    productDetailsId: '',
    address: '',
    city: '',
    department: '',
    stock: '',
  };
  @Output() submitForm = new EventEmitter<any>();

  formDetail: FormGroup | null = null;
  formError: string | null = null;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.formDetail = this.fb.group({
      productDetailsId: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      department: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && changes['initialData'].currentValue) {
      const data = changes['initialData'].currentValue;
      this.formDetail?.patchValue({
        productDetailsId: data.productDetailsId || '',
        address: data.address || '',
        city: data.city || '',
        department: data.department || '',
        stock: data.stock || '',
      });
      console.log('Formulario actualizado con initialData:', this.formDetail);
      this.cdRef.detectChanges(); // Fuerza la detección de cambios si es necesario
    }
  }

  handleSubmit(): void {
    if (this.formDetail?.invalid) {
      this.formError = 'Por favor, completa todos los campos obligatorios.';
      return;
    }
    console.log('Formulario válido:', this.formDetail?.value);
    this.submitForm.emit(this.formDetail?.value);
   // this.formDetail.reset(this.initialData);
    this.formError = null;
  }
}