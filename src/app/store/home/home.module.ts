import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HomeComponent,
    JumbotronComponent
  ],
  exports: [ HomeComponent ]
})
export class HomeModule { }
