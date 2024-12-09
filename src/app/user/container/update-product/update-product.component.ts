import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../service/alert.service';
import { ProductService } from '../../../service/product.service';
import { CategoriesService } from '../../../service/categories.service';
import { ProductDetailsService } from '../../../service/product-details.service';
import { ProductCharacteristicsValueService } from '../../../service/product-characteristics-value.service';
import { ProductPhotoService } from '../../../service/product-photo.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
editProduct() {
}
  productForm: FormGroup;
  categories: any[] = [];
  ProductDetailsData: any[] = [];
  productPhotoData: any[] = [];
  ProductCharacteristics: any[] = [];
  isLoading: boolean = false;
  productId: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private productDetailsService: ProductDetailsService,
    private productCharacteristicsService: ProductCharacteristicsValueService,
    private productPhotoService: ProductPhotoService
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      productCondition: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;
      this.loadProductData(this.productId);
      this.loadProductDetailData(this.productId);
      this.loadProductCharacteristics(this.productId);
      this.loadProductPhotoData(this.productId);
    }
  }

  // Método para abrir el modal de agregar detalles
  openAddModal(): void {
    this.alertService.showInfo('Abrir modal para agregar.');
    // Aquí integra la lógica para abrir el modal
  }

  // Cargar datos del producto
  loadProductData(productId: number): void {
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
      error: () => {
        this.alertService.showError('No se pudo cargar la información del producto.');
      }
    });
  }

  // Cargar detalles del producto
  loadProductDetailData(productId: number): void {
    this.productDetailsService.getAllProductDetails(productId).subscribe({
      next: (details) => {
        this.ProductDetailsData = details;
      },
      error: () => {
        this.alertService.showError('No se pudieron cargar los detalles del producto.');
      }
    });
  }

  // Cargar características del producto
  loadProductCharacteristics(productId: number): void {
    this.productCharacteristicsService.getAllProductCharacteristics(productId).subscribe({
      next: (characteristics) => {
        this.ProductCharacteristics= characteristics;
      },
      error: () => {
        this.alertService.showError('No se pudieron cargar las características del producto.');
      }
    });
  }

  // Cargar fotos del producto
  loadProductPhotoData(productId: number): void {
    this.productPhotoService.getAllProductPhoto(productId).subscribe({
      next: (photos) => {
        this.productPhotoData = photos;
      },
      error: () => {
        this.alertService.showError('No se pudieron cargar las fotos del producto.');
      }
    });
  }

  // Agregar detalles del producto
  addProductDetails(event: any): void {
    const { productDetailsId, address, city, department, stock } = event;
    this.productDetailsService.addProductDetails(productDetailsId, address, city, department, stock).subscribe({
      next: () => {
        this.alertService.showSuccess('Detalle del producto agregado con éxito.');
        this.loadProductDetailData(this.productId!);
      },
      error: () => {
        this.alertService.showError('No se pudo agregar el detalle del producto.');
      }
    });
  }

  // Actualizar detalles del producto
  updateProductDetails(event: any): void {
    const { productDetailsId, address, city, department, stock } = event;
    this.productDetailsService.updateProductDetails(productDetailsId, address, city, department, stock).subscribe({
      next: () => {
        this.alertService.showSuccess('Detalle del producto actualizado con éxito.');
        this.loadProductDetailData(this.productId!);
      },
      error: () => {
        this.alertService.showError('No se pudo actualizar el detalle del producto.');
      }
    });
  }

  // Agregar características del producto
  addCharacteristics(event: any): void {
    const { valueId, product, productCharacteristic, value } = event;
    this.productCharacteristicsService.addCharacteristics(valueId, product, productCharacteristic, value).subscribe({
      next: () => {
        this.alertService.showSuccess('Característica del producto agregada con éxito.');
        this.loadProductCharacteristics(this.productId!);
      },
      error: () => {
        this.alertService.showError('No se pudo agregar la característica del producto.');
      }
    });
  }

  // Actualizar características del producto
  updateProductCharacteristics(event: any): void {
    const { valueId, product, productCharacteristic, value } = event;
    this.productCharacteristicsService.updateProductCharacteristics(valueId, product, productCharacteristic, value).subscribe({
      next: () => {
        this.alertService.showSuccess('Característica del producto actualizada con éxito.');
        this.loadProductCharacteristics(this.productId!);
      },
      error: () => {
        this.alertService.showError('No se pudo actualizar la característica del producto.');
      }
    });
  }

  // Obtener todas las categorías
  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: () => {
        this.alertService.showError('No se pudieron cargar las categorías.');
      }
    });
  }
}
