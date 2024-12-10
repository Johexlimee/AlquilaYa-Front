import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ProductCharacteristicsService } from '../../../../service/product-characteristics.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-characteristics-value-modal',
  templateUrl: './product-characteristics-value-modal.component.html',
  styleUrls: ['./product-characteristics-value-modal.component.css']
})
export class ProductCharacteristicsValueModalComponent {
  productCharacteristics: any = []; 
  @Input() modalId: string = 'createModal1';
  @Input() isEditing: boolean = false;
  @Input() initialData: any = { value: '', characteristicId: ''   };

  @Output() submitForm = new EventEmitter<any>();

  form: FormGroup; 

  formError: string | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productCharaService: ProductCharacteristicsService,
    private cdRef: ChangeDetectorRef
  ) {
    // Inicializamos el formulario
    this.form = this.fb.group({
      value: ['', Validators.required],
      characteristicId: ['', Validators.required],
      valueId: [''] // Si es necesario incluir este campo en el formulario
    });
  }

  ngOnInit() {
    this.getAllCharacteristics();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && changes['initialData'].currentValue) {
      const data = changes['initialData'].currentValue;
      this.form.patchValue({
        value: data.value,
        characteristicId: data.productCharacteristic?.characteristicId,  
        valueId: data.valueId 
      });
      console.log('Formulario actualizado con initialData:', this.form.value);
      this.cdRef.detectChanges(); // Fuerza la detección de cambios si es necesario
    }
  }
  
  

  getAllCharacteristics(): void {
    this.productCharaService.getAllCharacteristics().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.productCharacteristics = data;
      },
      error: (error) => console.error('Error al obtener características:', error),
      complete: () => {
        console.log('Carga de características completada.');
      },
    });
  }

  handleSubmit(): void {
    if (this.form.invalid) {
      this.formError = 'Por favor, completa todos los campos obligatorios.';
      return;
    }
    console.log("Formulario válido:", this.form.value);
    this.submitForm.emit(this.form.value); // Aquí se emite 'valueId'
    this.form.reset(this.initialData);
    this.formError = null;
  }
  
}
