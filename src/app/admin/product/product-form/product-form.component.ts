import { Category } from './../../../models/category.model';
import { CategoryService } from './../../../services/category.service';
import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product.models';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Output() savingProduct = new EventEmitter<Product>();
  product: Product;
  productForm = this.formBuilder.group({
    'name': ['', Validators.required],
    'description': [''],
    'price': [0, Validators.required],
    'available': [true],
    'on_sale': [false],
    'category_id': [''],
    'image_url': ['']
  });
  categories = [];
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
    ) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  onSubmit(): void {
    this.product = new Product(this.productForm.value);
    const imgUrl = this.productForm.get('image_url').value;
    this.product.image_urls.push(imgUrl);
    this.productService.saveProduct(this.product).subscribe(product => {
      this.savingProduct.emit(product);
    });
  }
}
