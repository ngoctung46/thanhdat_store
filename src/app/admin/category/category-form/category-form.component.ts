import { Category } from './../../../models/category.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Output() savingCategory = new EventEmitter<Category>();
  categoryForm: FormGroup;
  category = new Category({});
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit(): void {
    this.savingCategory.emit(this.categoryForm.value);
    this.category = new Category({});
    this.initForm();
  }
  initForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: [this.category.name, Validators.required],
      description: [this.category.description]
    });
  }
}
