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
  constructor (
    private mediaService: ProductPhotoService,
  ) {}

  upload(event: any){
    const file = event.target.file[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.mediaService.postPhoto(formData).subscribe(response => {
        console.log('response', response);
        this.url = response.url;
      })
    }
  }
}
