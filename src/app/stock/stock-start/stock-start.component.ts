import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-stock-start',
  templateUrl: './stock-start.component.html',
  styleUrls: ['./stock-start.component.css']
})
export class StockStartComponent implements OnInit {

  showTable: boolean = false;
  categoriesWithProducts: any=null;
  isLoading: boolean = false;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.fetchProducts().subscribe(
      data => {
        this.isLoading = false;
        this.categoriesWithProducts = data;
        if(this.categoriesWithProducts.length !== 0){
          this.showTable=true;
        }

      }
    );
  }


}
