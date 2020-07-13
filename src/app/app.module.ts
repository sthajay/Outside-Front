import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './shared/alert/alert.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { BuyItemComponent } from './shopping-cart/buy-item/buy-item.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CategoryComponent } from './stock/category/category.component';
import { ProductComponent } from './stock/product/product.component';
import { StockStartComponent } from './stock/stock-start/stock-start.component';
import { StockComponent } from './stock/stock.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertComponent,
    ShoppingCartComponent,
    LoadingSpinnerComponent,
    StockComponent,
    StockStartComponent,
    CategoryComponent,
    ProductComponent,
    BuyItemComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
