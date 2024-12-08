import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-shop',
  templateUrl: './my-shop.component.html',
  styleUrl: './my-shop.component.css'
})
export class MyShopComponent {
  products:any;
  productId: number = 0;
  constructor( private productService: ProductService,private router: Router,private route: ActivatedRoute,) { }

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

}
