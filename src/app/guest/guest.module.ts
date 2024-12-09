import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { HomeComponent } from './container/home/home.component';
import { CartComponent } from './container/cart/cart.component';
import { DetailProductComponent } from './container/detail-product/detail-product.component';
import { ListProductsComponent } from './container/list-products/list-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    DetailProductComponent,
    ListProductsComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class GuestModule { }
