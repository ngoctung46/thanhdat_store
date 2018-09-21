import { ProductModule } from './product/product.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeModule } from './home/home.module';
import { ContactModule } from './contact/contact.module';
import { CategoryModule } from './category/category.module';
import { AboutModule } from './about/about.module';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    ContactModule,
    CategoryModule,
    AboutModule,
    ProductModule,
    AdminRoutingModule
  ],
  declarations: [DashboardComponent, AdminComponent, HeaderComponent, FooterComponent]
})
export class AdminModule { }
