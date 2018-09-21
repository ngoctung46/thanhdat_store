import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  editButtonName: string;
  isEditing: boolean;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  onDelete(id: string): void {
    this.categoryService.removeCategory(id).subscribe(_ => {
      this.categories = this.categories.filter(c => c._id !== id);
    });
  }

  onUpdate(category: Category): void {
    this.categoryService.updateCategory(category).subscribe(_ => {
      this.isEditing = false;
    });
  }

  private onSaving(category) {
    this.categoryService.saveCategory(category)
      .subscribe(cat => this.categories.push(cat));
  }


}
