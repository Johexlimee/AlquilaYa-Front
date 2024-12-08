import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../service/alert.service';
import { ProductService } from '../../../service/product.service';
import { CategoriesService } from '../../../service/categories.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  productForm: FormGroup;
  categories: any[] = [];
  isLoading: boolean = false;
  productId: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;
      this.loadProductData(this.productId);
      console.log(id)
    }
   
  }

  // Load product data for editing
  loadProductData(productId: number): void {
    console.log("loooooo",productId)
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          productCondition: product.productCondition,
          categoryId: product.categoryId,
        });
      },
      error: (error) => {
        this.alertService.showError('No se pudo cargar la información del producto.');
      },
    });
  }

  // Get all product categories
  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.alertService.showError('No se pudieron cargar las categorías.');
      },
    });
  }

  // Edit product
  async editProduct(): Promise<void> {
    if (this.productForm.invalid || !this.productId) {
      this.alertService.showError('Por favor, completa todos los campos correctamente.');
      return;
    }

    const { name, description, price, productCondition, categoryId } = this.productForm.value;

    this.isLoading = true; // Show loading state

    this.productService.editProduct(this.productId, name, description, price, productCondition, categoryId).subscribe({
      next: (result) => {
        if (result) {
          this.alertService.showSuccess('Producto editado con éxito.');
        } else {
          this.alertService.showError('No se pudo editar el producto. Inténtalo de nuevo.');
        }
      },
      error: (error) => {
        console.error('Error editing product:');
        this.alertService.showError('Ocurrió un error al editar el producto.');
      },
      complete: () => {
        this.isLoading = false; // Hide loading state after completion
      },
    });
  }
}

