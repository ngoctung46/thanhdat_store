import { Product } from './../models/product.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseService } from './base.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {
  private categoryUrl = 'api/category';
  private productUrl = 'api/product';
  constructor(private http: HttpClient) {
    super();
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        tap(products => this.log(`fetched ${products.length} products`)),
        catchError(this.handleError('getProducts', []))
        );
  }

  public saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productUrl, product, httpOptions)
      .pipe(
        tap(p => this.log(`save ${p.name} successfully`)),
        catchError(this.handleError('getProduct', null))
      );
  }
}