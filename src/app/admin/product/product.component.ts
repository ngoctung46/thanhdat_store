import { CategoryService } from './../../services/category.service';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.products.forEach(product => {
          this.categoryService.getCategory(product.category_id)
            .subscribe(category => product.category = category);
        });
      });
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

}
