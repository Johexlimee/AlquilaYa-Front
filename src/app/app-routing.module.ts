import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorLayoutComponent } from './layouts/visitor-layout/visitor-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { GuestModule } from './guest/guest.module';
import { HomeComponent } from './user/container/home/home.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule)
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
