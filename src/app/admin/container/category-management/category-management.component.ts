import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../service/categories.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  name: string = '';
  description: string = '';
  categories: any[] = [];
  selectedCategory: any = null;
  searchTerm: string = '';

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

   // Método para agregar una nueva categoría
   addCategory(categoryData:any): void {
    this.categoriesService.addCategory(categoryData.name, categoryData.description).subscribe({
      next: (response) => {
        if (response) {
          console.log('Categoría agregada con éxito:', response);
          this.getAllCategories(); // Actualizar la lista de categorías
        }
      },
      error: (error) => {
        console.error('Error al agregar categoría:', error);
      }
    });
  }

  // Método para obtener todas las categorías
  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        
      },
      error: (error) => {
        console.error('Error al obtener categorías:', error);
      }
    });
  }

 

  // Método para seleccionar una categoría para editar
  editCategory(category: any): void {
    this.selectedCategory = { ...category }; // Guardar los datos de la categoría seleccionada
    }

    updateCategory(updateCategory: any): void {
    this.categoriesService.updateCategory(updateCategory.categoryId, updateCategory.name, updateCategory.description).subscribe({
      next: (response) => {
        this.getAllCategories();
        this.selectedCategory = null;  // Resetear después de actualizar
      },
      error: (error) => console.error('Error al actualizar la categoria:', error)
    });
  }

  deleteCategory(deleteCategory:any): void{
    this.categoriesService.deleteCategory(deleteCategory.categoryId).subscribe({
      next:(response)=>{
        this.getAllCategories();
        this.selectedCategory = null; 
      },
      error: (error) => console.error('Error al eliminar el status de la categoria:', error)
      }
    )
  }
  
  // Método para cancelar la edición
  cancelEdit(): void {
    this.selectedCategory = null; // Limpiar la selección de categoría
  }

  // Filtrar 
  get filteredCategories() {
    return this.categories.filter(category =>
      category.categoryName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  
  }
}
