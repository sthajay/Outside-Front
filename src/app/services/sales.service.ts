import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sales } from '../models/sales.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(private http: HttpClient) { }

  storeSales(category: string, product: string, quantity: string, price: string, payment: string) {
    const sales: Sales = { category: category, product: product, quantity: quantity, price: price, payment: payment };
    return this.http.post<{ message: string, sales: Sales }>('http://localhost:3000/api/sales', sales);
  }
}
