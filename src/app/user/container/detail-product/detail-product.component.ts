import { Component } from '@angular/core';
import { ProductDetailsService } from '../../../service/product-details.service';
import { ProductCharacteristicsValueService } from '../../../service/product-characteristics-value.service';
import { ProductPhotoService } from '../../../service/product-photo.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../service/alert.service';
import { ProductService } from '../../../service/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderDetailsService } from '../../../service/order-details.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.css'
})
export class DetailProductComponent {
  orderForm: FormGroup;
  isLoading: boolean = false;
  link:String;
  apiKey:String;
  lugar:String;
  products:any = {};
  ProductDetailsData: any[] = [];
  productPhotoData: any[] = [];
  ProductCharacteristicsData: any[] = [];
  productId: number = 0;
  mapUrl: any;
  constructor(
    private alertService: AlertService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private ProductDetails:ProductDetailsService,
    private ProductCharacteristics: ProductCharacteristicsValueService,
    private productPhoto:ProductPhotoService,
    private orderDetailsService: OrderDetailsService,
    private sanitizer: DomSanitizer){
    this.apiKey = "AIzaSyBI5jgmZQB_p68Qge2QgLOaQ-m3mjXJOZk";
    this.lugar = "Uniempresarial"
    this.link = "https://www.google.com/maps/embed/v1/place?key=" + this.apiKey + "&q" + this.lugar ;

    this.orderForm = new FormGroup({
      productId: new FormControl('', []),
      startDate: new FormControl('', [
        Validators.required,
      ]),
      endDate: new FormControl('', [
        Validators.required,
      ]),
      quantity: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
    }, { validators: this.dateRangeValidator() })
  }


  dateRangeValidator(): ValidatorFn { 
    return (control: AbstractControl): { [key: string]: any } | null => { 
      const startDate = control.get('startDate')?.value; 
      const endDate = control.get('endDate')?.value; 
      return startDate && endDate && endDate < startDate ? { 'dateRangeInvalid': true } : null; 
    }; 
  }
  

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;
      this.loadProductData(this.productId);
      this.loadProductDetailData(this.productId)
      this.loadProductCharacteristicslData(this.productId)
      this.loadProductPhotoData(this.productId)
      console.log(id)
    }
  }

  async addOrderDetail(): Promise<void> {
    if (this.orderForm.invalid) {
      this.alertService.showError('Por favor, completa todos los campos correctamente.');
      return;
    }
    const { startDate, endDate, quantity } = this.orderForm.value;
    this.isLoading = true;

    this.orderDetailsService.addOrderDetail(startDate, endDate, quantity, this.productId ).subscribe({
      next: (result)=> {
        console.log("resultado", result)
        if (result) {
          this.alertService.showSuccess('Producto agregado al carrito con éxito.');
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

    // Load product data for editing
    loadProductData(productId: number): void {
      console.log('loooooo', productId);
      this.productService.getProductById(productId).subscribe({
        next: (product) => {
          this.products = product;
          console.log(this.products)
        },
        error: (error) => {
          this.alertService.showError(
            'No se pudo cargar la información del producto.'
          );
        },
      });
    }
  
// Load product details
loadProductDetailData(productId: number): void {
  console.log('loooooo', productId);

  // Cargar detalles del producto
  this.ProductDetails.getAllProductDetails(productId).subscribe({
    next: (product) => {
      this.ProductDetailsData = product;
      console.log(this.ProductDetailsData);

          // Verificar si hay características y obtener la dirección
         
            // const firstAddress = this.ProductDetailsData[0].address;
            const firstAddress = this.ProductDetailsData[0].address;
            console.log(firstAddress)
            const map = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBI5jgmZQB_p68Qge2QgLOaQ-m3mjXJOZk&q=${encodeURIComponent(firstAddress)}`;
              this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(map);
          
        },
  
    error: (error) => {
      this.alertService.showError('No se pudo cargar la información del producto.');
    },
  });
}

    // Load product details
    loadProductPhotoData(productId: number): void {
      console.log('loooooo', productId);
      this.productPhoto.getAllProductPhoto(productId).subscribe({
        next: (product) => {
          this.productPhotoData = product;
          console.log(this.productPhotoData)
        },
        error: (error) => {
          this.alertService.showError(
            'No se pudo cargar la información del producto.'
          );
        },
      });
    }
  
    // Load product data for editing
    loadProductCharacteristicslData(productId: number): void {
      console.log('loooooo', productId);
      this.ProductCharacteristics.getAllProductCharacteristics(
        productId
      ).subscribe({
        next: (product) => {
          this.ProductCharacteristicsData = product;
          console.log(this.ProductCharacteristicsData)
        },
        error: (error) => {
          this.alertService.showError(
            'No se pudo cargar la información del producto.'
          );
        },
      });
    }
  
    
}
