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
import { AddProductComponent } from './container/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './container/update-product/update-product.component';
import { DetailProductModalComponent } from './container/modals/detail-product-modal/detail-product-modal.component';
import { ProductCharacteristicsValueModalComponent } from './container/modals/product-characteristics-value-modal/product-characteristics-value-modal.component';
import { PostPhotoModalComponent } from './container/modals/post-photo-modal/post-photo-modal.component';


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
    AddProductComponent,
    UpdateProductComponent,
    DetailProductModalComponent,
    ProductCharacteristicsValueModalComponent,
    PostPhotoModalComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
