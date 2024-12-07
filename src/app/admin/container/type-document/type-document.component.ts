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
  addTypeDocument(): void {
    const typeDocument = { name: this.name, description: this.description };
    this.typeDocumentService.addTypeDocument(typeDocument.name, typeDocument.description).subscribe({
      next: (response) => {
        console.log('Tipo de documento añadido:', response);
        this.getAllTypeDocument();
        this.clearForm();
      },
      error: (error) => {
        console.error('Error al añadir tipo de documento:', error);
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

  // Método para editar un tipo de documento
  editTypeDocument(item: any): void {
    this.selectedTypeDocument = { ...item };
    this.name = this.selectedTypeDocument.name;  // Rellenar los campos con los valores seleccionados
    this.description = this.selectedTypeDocument.description;
    console.log('Tipo de documento seleccionado para editar:', this.selectedTypeDocument);
  }

  // Método para actualizar un tipo de documento
  updateTypeDocument(): void {
    if (!this.selectedTypeDocument) return;
    
    this.typeDocumentService.updateTypeDocument(this.selectedTypeDocument.id, this.name, this.description).subscribe({
      next: (response) => {
        console.log('Tipo de documento actualizado:', response);
        this.getAllTypeDocument();
        this.selectedTypeDocument = null;
        this.clearForm();
      },
      error: (error) => console.error('Error al actualizar el tipo de documento:', error)
    });
  }

  // Método para limpiar el formulario
  clearForm(): void {
    this.name = '';
    this.description = '';
  }
}
