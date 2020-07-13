import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categories: Category[] = [];
  constructor(private http: HttpClient) { }



  fetchCategories() {
    return this.http.get<{ categories: Category[] }>('http://localhost:3000/api/categories');
  }

  postCategory(name: string) {
    const category: Category = { id: null, name: name, product: null };
   return this.http.post<{ message: string }>('http://localhost:3000/api/categories', category);
  }

}
