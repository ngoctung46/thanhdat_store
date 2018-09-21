import { Category } from './../../../models/category.model';
import { CategoryService } from './../../../services/category.service';
import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product.models';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, ViewChild, Input, OnChanges } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Output() savingProduct = new EventEmitter<Product>();
  @ViewChild('content') content;
  @Input() product = new Product();
  productForm: any;
  categories = [];
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  ngOnChanges() {
    this.initForm();
  }

  onSubmit(): void {
    this.product = new Product(this.productForm.value);
    const imgUrl = this.productForm.get('image_url').value;
    this.product.image_urls.push(imgUrl);
    if (!this.product._id) {
      this.productService.saveProduct(this.product)
      .subscribe(product => {
        this.categoryService.getCategory(product.category_id)
          .subscribe(category => {
            product.category = category;
            this.savingProduct.emit(product);
        });
      });
    } else {
      this.productService.updateProduct(this.productForm.value)
        .subscribe(product => this.savingProduct.emit(product));
    }
  }

  open() {
    this.modalService.open(this.content);
  }

  private initForm(): void {
    this.productForm = this.formBuilder.group({
      '_id': [this.product._id],
      'name': [this.product.name, Validators.required],
      'description': [this.product.description],
      'price': [this.product.price, Validators.required],
      'available': [this.product.available],
      'on_sale': [this.product.on_sale],
      'category_id': [this.product.category_id],
      'image_url': []
    });
  }
}
