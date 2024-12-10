import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  categories: any[] = [];
  isLoading: boolean = false; 
  @Output() submitProduct = new EventEmitter<any>();

  formData!: FormGroup; 
  formError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario
    this.formData = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      productCondition: ['', Validators.required],
      categoryId: [null, Validators.required],
    });

    // Obtener las categorías
    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error al cargar las categorías:', error);
        this.alertService.showError('Error al cargar las categorías.');
      }
    });
  }

  handleSubmit(): void {
    if (this.formData.invalid) {
      this.formError = 'Por favor, completa todos los campos obligatorios.';
      return;
    }
    console.log("Formulario válido:", this.formData.value);
    this.submitProduct.emit(this.formData.value);
    this.formData.reset();
    this.formError = null;
  }
  
  
}
