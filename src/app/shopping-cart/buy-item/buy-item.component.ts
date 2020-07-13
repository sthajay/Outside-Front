import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-buy-item',
  templateUrl: './buy-item.component.html',
  styleUrls: ['./buy-item.component.css']
})
export class BuyItemComponent implements OnInit {

  alert: String = null;
  shoppingCartForm: FormGroup;
  productPrice: number = null;
  totalProductPrice: number = null;
  categories: Category[];
  options: String[] = ['Cash on Delivery', 'Stripe', 'Other'];
  isOtherVisible: boolean = false;
  products: Product[];
  price: number = 0;
  isLoading: boolean = false;
  error: String = null;
  alertType: String = null;
  priceEmitter = new EventEmitter<Product>();
  productToDisplay: String = null;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private salesService: SalesService) { }

  ngOnInit(): void {
    this.onInit();
    this.isLoading = true;
    this.categoriesService.fetchCategories().subscribe(
      data => {
        this.isLoading = false;
        this.categories = data.categories;
      }
    );
  }

  onInit() {
    this.shoppingCartForm = new FormGroup({
      'category': new FormControl(null, Validators.required),
      'product': new FormControl(null, Validators.required),
      'quantity': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'payment': new FormControl(null, Validators.required),
    });
  }

  onCategoryChange() {
    this.totalProductPrice = null;
    this.shoppingCartForm.get('price').reset();
    this.productPrice=null;
    this.shoppingCartForm.get('quantity').reset();
    const value = this.shoppingCartForm.value;
    if (value.category !== 'null') {
      this.productsService.getProductByCategoryId(parseInt(value.category, 10))
        .subscribe(
          data => {
            this.products = data.products;
          }
        );
    }
    else {
      this.products = [];
    }
    this.shoppingCartForm.patchValue({
      'product': 'null'
    });
  }

  onQuantityChange() {
    const quantity = +this.shoppingCartForm.value.quantity;
    const total = quantity * this.productPrice;
    this.shoppingCartForm.patchValue({
      'price': total
    });
  }


  onPaymentChange() {
    if (this.shoppingCartForm.value.payment === 'Other') {
      this.isOtherVisible = true;
      this.shoppingCartForm.get('payment').reset();
    }
  }

  onProductChange(event) {
    this.productPrice=null;
    const value = JSON.parse(event.target['value']);
    this.productToDisplay = value.name;
    this.productPrice = +value.price;
    this.shoppingCartForm.get('quantity').reset();
    this.shoppingCartForm.get('price').reset();
  }

  onSubmit() {
    if (!this.shoppingCartForm.valid) {
      this.alertType = 'alert alert-danger';
      this.error = 'Form is Invalid';
      return;
    }
    this.isLoading = true;
    const value = this.shoppingCartForm.value;
    this.salesService.storeSales(value.category, value.product, value.quantity, value.price, value.payment).subscribe(
      data => {
        this.isLoading = false;
        if (data.message === 'success') {
          this.alert = `You selected
          ${data.sales.quantity}
            ${this.productToDisplay}
           and paid ${data.sales.price}
           with ${data.sales.payment}.`;
        }
        this.onCancel();
      }
    );
  }

  onDelete() {
    this.isOtherVisible = false;
    this.shoppingCartForm.get('payment').reset();
  }

  onfinalAlertClose() {
    this.alert = null;
  }

  onCancel() {
    this.error = null;
    this.alertType = null;
    this.productPrice = null;
    this.shoppingCartForm.reset();
  }

}
