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
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent {
  productForm: FormGroup;
  categories: any[] = [];

  ProductDetailsData: any[] = [];
  selectedProductDetailsData: any = null;
  productPhotoData: any[] = [];

  ProductCharacteristics: any[] = [];
  selectedCharacteristic: any = null;
  selectedProductChara: any = null;
  isLoading: boolean = false;
  productId: number | null = null;
  valueId: number | null = null;
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
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
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
  // Cargar características del producto
  loadProductCharacteristics(productId: number): void {
    this.productCharacteristicsService
      .getAllProductCharacteristics(productId)
      .subscribe({
        next: (characteristics) => {
          this.ProductCharacteristics = characteristics;
        },
        error: () => {
          this.alertService.showError(
            'No se pudieron cargar las características del producto.'
          );
        },
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
      },
    });
  }

  addCharacteristics(event: any): void {
    const { value, characteristicId } = event;
    if (this.productId) {
      console.log('Adding characteristic for product id:', this.productId);
      this.productCharacteristicsService
        .addCharacteristics(value, this.productId, characteristicId)
        .subscribe({
          next: () => {
            this.alertService.showSuccess(
              'Característica del producto agregada con éxito.'
            );
            this.loadProductCharacteristics(this.productId!);
          },
          error: () => {
            this.alertService.showError(
              'No se pudo agregar la característica del producto.'
            );
          },
        });
    }
  }

  editCharacteristic(item: any): void {
    this.selectedProductChara = { ...item }; 
    console.log("datos editar init",this.selectedProductChara);
  }

  updateProductCharacteristics(updateProductCharacteristics: any): void {
    // Asegúrate de que 'updateProductCharacteristics' contenga 'valueId'
    console.log('Datos enviados para actualizar:', updateProductCharacteristics);
  console.log("product",this.productId)
    if (this.productId) {
      this.productCharacteristicsService
        .updateProductCharacteristics(
          updateProductCharacteristics.valueId,  // 'valueId' ahora está incluido
          updateProductCharacteristics.value,
          this.productId,
          updateProductCharacteristics.characteristicId
        )
        .subscribe({
          next: () => {
            this.alertService.showSuccess('Característica del producto actualizada con éxito.');
            this.loadProductCharacteristics(this.productId!);
            this.selectedCharacteristic = null;
          },
          error: () => {
            this.alertService.showError('No se pudo actualizar la característica del producto.');
          },
        });
    }
  }

  editProductDetails(item: any): void {
    this.selectedProductDetailsData = { ...item };  // Aquí se asegura que los datos sean copiados correctamente
    console.log("Datos a editar", this.selectedProductDetailsData);
  }
  

  addProductDetails(event: any): void {
    const { address, city,department,stock } = event;
    if (this.productId) {
      console.log('Adding characteristic for product id:', this.productId);
      this.productDetailsService.addProductDetails(address,city,department, this.productId,stock)
        .subscribe({
          next: () => {
            this.alertService.showSuccess(
              'Característica del producto agregada con éxito.'
            );
            this.loadProductCharacteristics(this.productId!);
          },
          error: () => {
            this.alertService.showError(
              'No se pudo agregar la característica del producto.'
            );
          },
        });
    }
  }
  

  // Edit product
  async editProduct(): Promise<void> {
    if (this.productForm.invalid || !this.productId) {
      this.alertService.showError(
        'Por favor, completa todos los campos correctamente.'
      );
      return;
    }

    const { name, description, price, productCondition, categoryId } =
      this.productForm.value;

    this.isLoading = true;

    this.productService
      .editProduct(
        this.productId,
        name,
        description,
        price,
        productCondition,
        categoryId
      )
      .subscribe({
        next: (result) => {
          if (result) {
            this.alertService.showSuccess('Producto editado con éxito.');
          } else {
            this.alertService.showError(
              'No se pudo editar el producto. Inténtalo de nuevo.'
            );
          }
        },
        error: (error) => {
          console.error('Error editing product:');
          this.alertService.showError(
            'Ocurrió un error al editar el producto.'
          );
        },
        complete: () => {
          this.isLoading = false;
        },
      });
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
        this.alertService.showError(
          'No se pudo cargar la información del producto.'
        );
      },
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





 // Actualizar detalles del producto
async updateProductDetails(event: any): Promise<void> {
  if (!event || !event.productDetailsId || !this.productId) {
    this.alertService.showError('Datos inválidos para actualizar el detalle del producto.');
    return;
  }

  const { productDetailsId, address, city, department, stock } = event;

  // Validar que los campos obligatorios no estén vacíos
  if (!address || !city || !department || stock === undefined) {
    this.alertService.showError('Por favor, completa todos los campos correctamente.');
    return;
  }

  this.isLoading = true;

  try {
    const result = await this.productDetailsService.updateProductDetails(
      productDetailsId, 
      address, 
      city, 
      department, 
      this.productId, 
      stock
    ).toPromise();

    if (result) {
      this.alertService.showSuccess('Detalle del producto actualizado con éxito.');
      this.loadProductDetailData(this.productId!); // Recargar datos del producto actualizado
    } else {
      this.alertService.showError('No se pudo actualizar el detalle del producto. Inténtalo de nuevo.');
    }
  } catch (error) {
    console.error('Error actualizando el detalle del producto:', error);
    this.alertService.showError('Ocurrió un error al actualizar el detalle del producto.');
  } finally {
    this.isLoading = false;
  }
}

  /*


  
 

  // Cargar características del producto
  loadProductCharacteristics(productId: number): void {
    this.productCharacteristicsService.getAllProductCharacteristics(productId).subscribe({
      next: (characteristics) => {
        this.ProductCharacteristics = characteristics;
      },
      error: () => {
        this.alertService.showError('No se pudieron cargar las características del producto.');
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


 // Edit product
 async editProduct(): Promise<void> {
  if (this.productForm.invalid || !this.productId) {
    this.alertService.showError(
      'Por favor, completa todos los campos correctamente.'
    );
    return;
  }

  const { name, description, price, productCondition, categoryId } =
    this.productForm.value;

  this.isLoading = true; // Show loading state

  this.productService
    .editProduct(
      this.productId,
      name,
      description,
      price,
      productCondition,
      categoryId
    )
    .subscribe({
      next: (result) => {
        if (result) {
          this.alertService.showSuccess('Producto editado con éxito.');
        } else {
          this.alertService.showError(
            'No se pudo editar el producto. Inténtalo de nuevo.'
          );
        }
      },
      error: (error) => {
        console.error('Error editing product:');
        this.alertService.showError(
          'Ocurrió un error al editar el producto.'
        );
      },
      complete: () => {
        this.isLoading = false; // Hide loading state after completion
      },
    });
}
}
*/
}
