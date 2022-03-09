import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { LoginComponent } from '@components/login/login.component';
import { ProductComponent } from '@components/product/product.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('@components/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'product',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@components/product/product.module').then((m) => m.ProductModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
