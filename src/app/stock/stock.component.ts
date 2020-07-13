import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  onAddCategoryClick() {
    this.router.navigate(['addCategory'], { relativeTo: this.route });
  }

  onAddProductClick() {
    this.router.navigate(['addProduct'], { relativeTo: this.route });
  }

  onAllProductsClick() {
    this.router.navigate(['/stock']);

  }
}
