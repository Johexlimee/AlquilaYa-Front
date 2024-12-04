import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { CategoryManagementComponent } from './container/category-management/category-management.component';
import { ProfileComponent } from './container/profile/profile.component';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { DocumentVerifierComponent } from './container/document-verifier/document-verifier.component';
import { ReportsComponent } from './container/reports/reports.component';
import { ProductCharacteristicsComponent } from './container/product-characteristics/product-characteristics.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'categorymanagement', component: CategoryManagementComponent},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'documentverifier', component: DocumentVerifierComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'reports', component: ReportsComponent},
      { path: 'characteristics', component: ProductCharacteristicsComponent},
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
