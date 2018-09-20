import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { HomeModule } from './home/home.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';
import { CategoryModule } from './category/category.module';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    HomeModule,
    AboutModule,
    ContactModule,
    CategoryModule
  ],
  declarations: [StoreComponent, HeaderComponent, FooterComponent]
})
export class StoreModule { }
