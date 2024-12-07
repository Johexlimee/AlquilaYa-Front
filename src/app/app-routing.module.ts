import { NgModule } from '@angular/core';
import { authGuard  } from './auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [authGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule), canActivate: [authGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
