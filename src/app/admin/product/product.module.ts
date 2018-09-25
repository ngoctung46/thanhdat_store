import { FileSelectDirective } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  declarations: [ProductComponent, ProductFormComponent, FileSelectDirective ],
  exports: []
})
export class ProductModule { }
