import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from '../layouts/user-layout/user-layout.component';
import { FavoriteComponent } from './container/favorite/favorite.component';
import { CartComponent } from '../cart/cart.component';
import { ProfileComponent } from './container/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'favorite', component: FavoriteComponent },
      { path: 'cart', component: CartComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
