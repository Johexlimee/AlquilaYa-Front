import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorLayoutComponent } from './layouts/visitor-layout/visitor-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { GuestModule } from './guest/guest.module';

const routes: Routes = [
  { path: '', component: VisitorLayoutComponent, loadChildren: ()=>import('./guest/guest-routing.module').then((m)=>GuestModule)},
  { path: 'user', component: UserLayoutComponent, loadChildren: ()=> import('./user/user-routing.module').then((m)=>UserModule )},
  { path: 'admin', component: AdminLayoutComponent, loadChildren: ()=> import('./admin/admin-routing.module').then((m)=>AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
