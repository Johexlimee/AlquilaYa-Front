import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CartComponent } from './cart/cart.component';
import { VisitorLayoutComponent } from './layouts/visitor-layout/visitor-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainHeaderComponent } from './components/header/main-header/main-header.component';
import { AdminHeaderComponent } from './components/header/admin-header/admin-header.component';
import { UserHeaderComponent } from './components/header/user-header/user-header.component';
import { RegisterModalComponent } from './components/modals/register-modal/register-modal.component';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    ListProductsComponent,
    DetailProductComponent,
    CartComponent,
    VisitorLayoutComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    MainHeaderComponent,
    AdminHeaderComponent,
    UserHeaderComponent,
    RegisterModalComponent,
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
