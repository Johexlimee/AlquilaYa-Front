import { Component, OnInit } from '@angular/core';
import { TypeDocumentService } from '../../../service/type-document.service'; // Servicio para tipo de documento

@Component({
  selector: 'app-type-document',
  templateUrl: './type-document.component.html',
  styleUrls: ['./type-document.component.css']
})
export class TypeDocumentComponent implements OnInit {
  name: string = '';
  description: string = ''; // Agregar campo para descripción
  data: any[] = [];
  selectedTypeDocument: any = null;

  constructor(private typeDocumentService: TypeDocumentService) {}

  ngOnInit(): void {
    this.getAllTypeDocument();
  }

  // Método para agregar un nuevo tipo de documento
  addTypeDocument(typeDocument:any): void {
    this.typeDocumentService.addTypeDocument(typeDocument.typeDocumentId, typeDocument.documentName).subscribe({
      next: (response) => {
        if (response) {
          console.log('documento agregado con éxito:', response);
          this.getAllTypeDocument(); // Actualizar la lista de categorías
        }
      },
      error: (error) => {
        console.error('Error al agregar tipo de documento:', error);
      }
    });
  }

  // Método para obtener todos los tipos de documentos
  getAllTypeDocument(): void {
    this.typeDocumentService.getAllTypeDocuments().subscribe({
      next: (data) => {
        this.data = data;
        
      },
      error: (error) => console.error('Error al obtener tipos de documentos:', error)
    });
  }

  // Método para seleccionar 
  editTypeDocument(typeDocument: any): void {
    this.selectedTypeDocument = { ...typeDocument }; 
    }
  // Método para actualizar un tipo de documento
  updateTypeDocument(updateTypeDocument: any): void {
    this.typeDocumentService.updateTypeDocument(updateTypeDocument.typeDocumentId, updateTypeDocument.documentName ).subscribe({
      next: (response) => {
        this.getAllTypeDocument();
        this.selectedTypeDocument = null;  // Resetear después de actualizar
      },
      error: (error) => console.error('Error al actualizar, intenta de nuevo ', error)
    });
  }

  // Método para limpiar el formulario
  clearForm(): void {
    this.name = '';
    this.description = '';
  }
}
