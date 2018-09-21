import { CategoryService } from './../../services/category.service';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product.models';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('productForm') productForm;
  products = [];
  selectedProduct = new Product();
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
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
    let exist = false;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i]._id === product._id) {
        this.getProducts();
        exist = true;
      }
    }
    if (!exist) {
      this.products.push(product);
    }
  }

  openModal(): void {
    this.productForm.open();
  }

}
