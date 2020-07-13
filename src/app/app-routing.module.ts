import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CategoryComponent } from './stock/category/category.component';
import { ProductComponent } from './stock/product/product.component';
import { StockStartComponent } from './stock/stock-start/stock-start.component';
import { StockComponent } from './stock/stock.component';


const routes: Routes = [

  { path: '', component: AuthComponent },
  {
    path: 'stock', component: StockComponent, canActivate: [AuthGuard], children: [
      { path: '', component: StockStartComponent },
      { path: 'addProduct', component: ProductComponent },
      { path: 'addCategory', component: CategoryComponent },
    ]
  },
  { path: 'shoppingCart', canActivate: [AuthGuard], component: ShoppingCartComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
