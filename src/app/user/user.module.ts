import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './container/home/home.component';
import { HeaderComponent } from './container/header/header.component';
import { FavoriteComponent } from './container/favorite/favorite.component';
import { CartComponent } from './container/cart/cart.component';
import { ListProductsComponent } from './container/list-products/list-products.component';
import { DetailProductComponent } from './container/detail-product/detail-product.component';
import { ProfileComponent } from './container/profile/profile.component';
import { DocumentComponent } from './container/document/document.component';
import { MyShopComponent } from './container/my-shop/my-shop.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FavoriteComponent,
    CartComponent,
    ListProductsComponent,
    DetailProductComponent,
    ProfileComponent,
    DocumentComponent,
    MyShopComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
