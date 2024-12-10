import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../service/alert.service';

@Component({
  selector: 'app-my-shop',
  templateUrl: './my-shop.component.html',
  styleUrl: './my-shop.component.css'
})
export class MyShopComponent {
  products:any;
  productId: number = 0;
  isLoading: boolean = false;
  constructor( private alertService: AlertService, private productService: ProductService,private router: Router,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getAllProductsUser();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;
      this.getAllProductsUser();
    } else {
      this.router.navigate(['/user/myshop']); 
    }
  }

  getAllProductsUser(): void {
    this.productService.getAllProductsUser().subscribe({
      next: (data) => {
        console.log("holaa ingreso");
        console.log(data);
        this.products = data;
      },
      error: (error) => console.log(error),
      complete: () => {
        console.log("Se completó");
      }
    });
  }

  idProduct(productId: number): void {
    this.router.navigate([`/user/myshop/details/${productId}`]);
    console.log(productId)
  }


// Manejar la adición de un nuevo producto desde el modal
handleAddProduct(newProduct: any): void {
  console.log("Datos recibidos del hijo:", newProduct);  
  this.isLoading = true;
  this.productService.addProduct(
    newProduct.name,
    newProduct.description,
    newProduct.price,
    newProduct.productCondition,
    newProduct.categoryId
  ).subscribe({
    next: () => {
      this.alertService.showSuccess('Producto agregado con éxito.');
      this.getAllProductsUser();
    },
    error: (error) => {
      console.error('Error al agregar producto:', error);
      this.alertService.showError('Error al agregar el producto.');
    },
    complete: () => (this.isLoading = false),
  });
}



}
