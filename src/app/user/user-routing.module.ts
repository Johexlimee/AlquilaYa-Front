import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './container/cart/cart.component';
import { DetailProductComponent } from './container/detail-product/detail-product.component';
import { FavoriteComponent } from './container/favorite/favorite.component';
import { DocumentComponent } from './container/document/document.component';
import { HomeComponent } from './container/home/home.component';
import { ListProductsComponent } from './container/list-products/list-products.component';
import { MyShopComponent } from './container/my-shop/my-shop.component';
import { ProfileComponent } from './container/profile/profile.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: 'cart', component: CartComponent},
      { path: 'detailcomponent', component: DetailProductComponent},
      { path: 'document', component: DocumentComponent},
      { path: 'favorite', component: FavoriteComponent},
      { path: '', component: HomeComponent},
      { path: 'listproducts', component: ListProductsComponent},
      { path: 'myshop', component: MyShopComponent},
      { path: 'profile', component: ProfileComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
