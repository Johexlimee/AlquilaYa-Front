import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.css']
})
export class CategoriesModalComponent  {
  @Input() modalId: string = 'createModal'; 
  @Input() isEditing: boolean = false; 
  @Input() initialData: any = { name: '', description: '' }; 
  @Output() submitForm = new EventEmitter<any>(); 

  formData = { name: '', description: '' }; 
  formError: string | null = null;
  loading: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges() {
    this.formData = { ...this.initialData };
    this.cdRef.detectChanges();
  }

  handleSubmit() {
    if (!this.formData.name.trim() || !this.formData.description.trim()) {
      this.formError = 'Ambos campos son obligatorios.';
      return;
    }

    this.loading = true;
    setTimeout(() => {
      this.submitForm.emit(this.formData);
      this.loading = false;
      this.formError = null;  
    }, 1000);
  }

  handleCancel(): void {
    this.formData = { name: '', description: '' };
    this.formError = null;
  }
}
