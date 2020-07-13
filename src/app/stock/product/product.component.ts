import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  error: String = null;
  alertType: String = null;
  isLoading: boolean = false;
  categories: any;
  constructor(private categoriesService: CategoriesService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.onInit();
    this.categoriesService.fetchCategories().subscribe(
      data => {
        this.categories = data.categories;
      }
    );;
  }

  onInit() {
    this.productForm = new FormGroup({
      'category': new FormControl(null, Validators.required),
      'productName': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (!this.productForm.valid) {
      this.alertType = 'alert alert-danger';
      this.error = 'Form is invalid!!';
      return;
    }
    this.error = null;
    this.isLoading = true;
    const value = this.productForm.value;
    this.productsService.storeProduct(value.productName, (value.price).toString(), value.category)
      .subscribe(
        data => {
          this.error = data.message;
          this.isLoading = false;
          if (this.error === 'error') {
            this.alertType = 'alert alert-danger';
            this.error = 'Product Already Exists!!';
          } else {
            this.alertType = 'alert alert-success';
            this.productForm.reset();
          }
        }
      );
  }

  onCancelBtnClick() {
    this.productForm.reset();
    this.alertType = null;
    this.error = null;

  }

}
