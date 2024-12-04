import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitorLayoutComponent } from './layouts/visitor-layout/visitor-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainHeaderComponent } from './components/header/main-header/main-header.component';
import { AdminHeaderComponent } from './components/header/admin-header/admin-header.component';
import { UserHeaderComponent } from './components/header/user-header/user-header.component';
import { RegisterModalComponent } from './components/modals/register-modal/register-modal.component';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    VisitorLayoutComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
    MainHeaderComponent,
    AdminHeaderComponent,
    UserHeaderComponent,
    RegisterModalComponent,
    LoginModalComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers:[provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
