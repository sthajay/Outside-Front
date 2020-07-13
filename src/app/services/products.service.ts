import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [];
  constructor(private http: HttpClient) { }



  fetchProducts() {
    return this.http.get('http://localhost:3000/api/products');
  }

  storeProduct(name: string, price: string, categoryId: number) {
    const product: Product = { id: null, name: name, price: price, categoryId: categoryId };
   return this.http.post<{ message: string }>('http://localhost:3000/api/products', product);
  }

  getProductByCategoryId(categoryId: number) {
    return this.http.get<{ products: Product[] }>('http://localhost:3000/api/products/' + categoryId);
  }

  getPriceByProduct(productName: string) {
    return this.http.get<{ product: Product }>('http://localhost:3000/api/products/product' + productName);
  }
}
