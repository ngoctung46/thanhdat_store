import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StoreModule } from './store/store.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TruncatePipe } from './pipes/truncate.pipe';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AdminModule,
    StoreModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
