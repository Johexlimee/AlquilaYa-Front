import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCharacteristicsService } from '../../../../service/product-characteristics.service';

@Component({
  selector: 'app-product-characteristics-modal',
  templateUrl: './product-characteristics-modal.component.html',
  styleUrls: ['./product-characteristics-modal.component.css']
})
export class ProductCharacteristicsModalComponent {
  dataProductChara: any = [];
  @Input() modalId: string = 'createModal';
  @Input() isEditing: boolean = false;
  @Input() initialData: any = { characteristicName: '' };
  @Output() submitForm = new EventEmitter<any>();

  formData = { characteristicName: '' };
  formError: string | null = null;
  loading: boolean = false;

  constructor(
    private productCharaService: ProductCharacteristicsService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnChanges() {
    this.formData = { ...this.initialData };
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
