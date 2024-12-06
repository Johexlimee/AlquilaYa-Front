import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-typedocument-modal',
  templateUrl: './typedocument-modal.component.html',
  styleUrls: ['./typedocument-modal.component.css']
})
export class TypeDocumentModalComponent {
  @Input() modalId: string = 'createModal';
  @Input() isEditing: boolean = false;
  @Input() initialData: any = { name: '', description: '' };  // Campos modificados a 'name' y 'description'
  @Output() submitForm = new EventEmitter<any>();

  formData = { name: '', description: '' };  // Campos modificados a 'name' y 'description'
  formError: string | null = null;
  loading: boolean = false;

  ngOnChanges() {
    // Se actualizan los datos iniciales cuando cambian los inputs
    this.formData = { ...this.initialData };
  }

  handleSubmit() {
    if (!this.formData.name.trim()) {
      this.formError = 'El nombre es obligatorio.';
      return;
    }

    if (!this.formData.description.trim()) {
      this.formError = 'La descripción es obligatoria.';
      return;
    }

    this.loading = true;
    setTimeout(() => {
      this.submitForm.emit(this.formData); // Emitir datos al componente padre
      this.loading = false;
    }, 1000);
  }
}
