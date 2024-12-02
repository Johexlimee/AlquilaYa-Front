import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './container/cart/cart.component';
import { DetailProductComponent } from './container/detail-product/detail-product.component';
import { HomeComponent } from './container/home/home.component';
import { ListProductsComponent } from './container/list-products/list-products.component';
import { VisitorLayoutComponent } from '../layouts/visitor-layout/visitor-layout.component';

const routes: Routes = [
  {
    path: '',
    component: VisitorLayoutComponent,
    children: [
      { path: 'cart', component: CartComponent},
      { path: 'detailproduct', component: DetailProductComponent},
      { path: '', component: HomeComponent},
      { path: 'listproducts', component: ListProductsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
