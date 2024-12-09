import { Component, Input } from '@angular/core';
import { ProductPhotoService } from '../../../../service/product-photo.service';

@Component({
  selector: 'app-post-photo-modal',
  templateUrl: './post-photo-modal.component.html',
  styleUrl: './post-photo-modal.component.css'
})
export class PostPhotoModalComponent {
  @Input() modalId: string = 'createPhotoModal';
  @Input() isEditing: boolean = false;

  url?: string;
  id: number  = 0;
  formData: FormData | null = null;
  constructor (
    private mediaService: ProductPhotoService,
  ) {}

  upload(event: any){
    const file = event.target.files[0];
    if (file) {
      this.formData = new FormData();
      this.formData.append('file', file);
      console.log('Archivo cargado:', file);
      console.log('FormData:', this.formData);
    } else { 
      this.formData = null; 
    }
  }

  submit() { 
    if (this.formData && this.id !== undefined) { 
      this.mediaService.postPhoto(this.formData, this.id).subscribe(response => { 
        console.log('response', response); 
        this.url = response.url; 
      }); 
    } else { 
      if (!this.formData) { 
        console.error('Error: No se ha seleccionado ninguna imagen.'); 
      } 
      if (this.id <= 0) { 
        console.error('Error: El parámetro debe ser un valor positivo.'); 
      }
    } 
  }
}
