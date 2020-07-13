import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryForm: FormGroup;
  isLoading: boolean = false;
  error: String = null;
  alertType: String = null;
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.onInit();
  }

  onInit() {
    this.categoryForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (!this.categoryForm.valid) {
      this.alertType = 'alert alert-danger';
      this.error = 'Please check the inputs carefully.';
      return;
    }
    this.error=null;
    this.isLoading = true;
    this.categoriesService.postCategory(this.categoryForm.value.name)
      .subscribe(data => {
        this.error = data.message;
        this.isLoading = false;
        if (this.error === 'error') {
          this.alertType = 'alert alert-danger';
          this.error='Category Already Exists!!';
        }
        else {
          this.alertType = 'alert alert-success';
        }
        this.categoryForm.reset();
      });;
  }

  onCancelBtnClick() {
    this.error = null;
    this.alertType = null;
    this.categoryForm.reset();
  }

}
