import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { HomeComponent } from './home/home.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CartComponent } from './cart/cart.component';
import { VisitorLayoutComponent } from './layouts/visitor-layout/visitor-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'listproducts', component: ListProductsComponent },
//   { path: 'detailproduct', component: DetailProductComponent },
//   { path: 'cart', component: CartComponent},
// ];

const routes: Routes = [
  {
    path: '',
    component: VisitorLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      // { path: 'about', component: VisitorAboutComponent }
    ]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
