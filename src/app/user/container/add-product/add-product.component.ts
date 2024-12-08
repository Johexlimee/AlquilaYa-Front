import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../service/alert.service';
import { ProductService } from '../../../service/product.service';
import { CategoriesService } from '../../../service/categories.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: any[] = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private productService: ProductService,
    private categoriesService: CategoriesService
  ) {
    // Define the form with required fields
    this.productForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
     
      productCondition: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(bueno|usado)$/),
      ]),
      categoryId: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  // Get all product categories
  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(data)
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.alertService.showError('No se pudieron cargar las categorías.');
      },
    });
  }

  // Add a new product
  async addProduct(): Promise<void> {
    if (this.productForm.invalid) {
      this.alertService.showError('Por favor, completa todos los campos correctamente.');
      return;
    }
  
    const { name, description, price, productCondition, categoryId } = this.productForm.value; // Desestructurar el objeto
  
    this.isLoading = true; // Mostrar estado de carga
  
    // Llamar al servicio pasando los valores directamente
    this.productService.addProduct(name, description, price, productCondition, categoryId).subscribe({
      next: (result) => {
        console.log("resultadooo",result)
        if (result) {
          this.alertService.showSuccess('Producto agregado con éxito.');
        } else {
          this.alertService.showError('No se pudo agregar el producto. Inténtalo de nuevo.');
        }
      },
      error: (error) => {
        console.error('Error adding product:', error);
        this.alertService.showError('Ocurrió un error al agregar el producto.');
      },
      complete: () => {
        this.isLoading = false; // Ocultar el estado de carga después de completar
      },
    });
  }
  
  
}
