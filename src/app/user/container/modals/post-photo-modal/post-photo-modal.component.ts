import { Component, Input } from '@angular/core';
import { ProductPhotoService } from '../../../../service/product-photo.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../service/alert.service';

@Component({
  selector: 'app-post-photo-modal',
  templateUrl: './post-photo-modal.component.html',
  styleUrl: './post-photo-modal.component.css'
})
export class PostPhotoModalComponent {
  @Input() modalId: string = 'createPhotoModal';
  @Input() isEditing: boolean = false;

  url?: string;
  productId: number = 0;
  formData: FormData | null = null;

  constructor (
    private route: ActivatedRoute,
    private alertService: AlertService,
    private mediaService: ProductPhotoService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;
      console.log('Aqui esta tu id pedazo de nega', this.productId);
    }
  }

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
    if (this.formData && this.productId !== undefined) { 
      this.mediaService.postPhoto(this.formData, this.productId).subscribe(response => { 
        console.log('response', response); 
        this.url = response.url;
        this.alertService.showSuccess('La imagen se ha agregado correctamente, por favor recargue la pagina');
      }); 
    } else { 
      if (!this.formData) { 
        this.alertService.showError('No se ha seleccionado ninguna imagen.');
      } 
    } 
  }
}
