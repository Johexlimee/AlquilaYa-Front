import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-typedocument-modal',
  templateUrl: './typedocument-modal.component.html',
  styleUrls: ['./typedocument-modal.component.css']
})
export class TypeDocumentModalComponent {
  @Input() modalId: string = 'createModal';
  @Input() isEditing: boolean = false;
  @Input() initialData: any = { typeDocumentId: '', documentName: '' };  
  @Output() submitForm = new EventEmitter<any>();

  formData = { typeDocumentId: '', documentName: '' };  
  formError: string | null = null;
  loading: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges() {
    // Se actualizan los datos iniciales cuando cambian los inputs
    this.formData = { ...this.initialData };
    this.cdRef.detectChanges();
  }

  handleSubmit() {
    if (!this.formData.documentName.trim()) {
      this.formError = 'El nombre es obligatorio.';
      return;
    }

    this.loading = true;
    setTimeout(() => {
      this.submitForm.emit(this.formData); // Emitir datos al componente padre
      this.loading = false;
      this.formError = null;  
    }, 1000);
  }

    handleCancel(): void {
      this.formData = { typeDocumentId: '', documentName: '' };
      this.formError = null;
    }
  }
  
