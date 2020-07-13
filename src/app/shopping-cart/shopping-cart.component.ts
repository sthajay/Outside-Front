import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {


  categoriesWithProducts: any;
  isLoading: boolean = false;
  showTable: boolean = false;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.fetchProducts().subscribe(
      data => {
        this.isLoading = false;
        this.categoriesWithProducts = data;
        if (this.categoriesWithProducts.length !== 0) {
          this.showTable = true;
        }
      }
    );
  }

}
