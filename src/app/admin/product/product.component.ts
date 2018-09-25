import { CategoryService } from './../../services/category.service';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product.models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const IMG_PLACEHOLDER = 'placeholder.png';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('productForm') productForm;
  filteredProducts = [];
  selectedProduct = new Product();
  p = 1;
  products = [];
  private searchTearms = new Subject<string>();
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.searchTearms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(term => {
      if (term === '' || term === undefined) {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(x => x.name.includes(term.trim()));
      }
    });
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.products.forEach(product => {
          this.categoryService.getCategory(product.category_id)
            .subscribe(category => product.category = category);
        });
        this.filteredProducts = this.products;
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

  removeProduct(id: string): void {
    this.productService.removeProduct(id)
      .subscribe(_ => this.products = this.products.filter(x => x._id !== id));
  }

  openModal(): void {
    this.productForm.open();
  }

  getImageUrl(product): string {
    if (product.image_urls != null && product.image_urls.length > 0) {
      if (product.image_urls[0] !== '') {
        return product.image_urls[0];
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  search(term: string): void {
    this.searchTearms.next(term);
  }

}
