import { Product } from './../models/product.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseService } from './base.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService {
  private categoryUrl = 'api/category';
  private productUrl = 'api/product';
  constructor(private http: HttpClient) {
    super();
  }

  /** Get categories from the server */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl)
      .pipe(
        tap(categories => {
          categories.forEach(category => {
            this.getProducts(category._id)
              .subscribe(products => category.products = products);
          });
        }),
        catchError(this.handleError('getCategories', []))
      );
  }

  getCategory(id: string): Observable<Category> {
    const url = `${this.categoryUrl}/${id}`;
    return this.http.get<Category>(url)
      .pipe(
        tap(cat => {
          this.getProducts(cat._id)
            .subscribe(products => cat.products = products);
        }),
        catchError(this.handleError('getCategory', null))
        );
  }

  /** Add new category to the server */
  saveCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoryUrl, category, httpOptions)
      .pipe(
        tap(cat => this.log(`${cat.name} added successfully`)),
        catchError(this.handleError('saveCategory', null))
      );
  }

  /** Update existing category on server */
  updateCategory(category: Category): Observable<Category> {
    const url = `${this.categoryUrl}/${category._id}`;
    return this.http.put<Category>(url, category, httpOptions)
      .pipe(
        tap(cat => this.log(`${cat.name} updated successfully`)),
        catchError(this.handleError('updateCategory', null))
      );
  }

  /** Delete existing category on server */
  removeCategory(id: String): Observable<Category> {
    const url = `${this.categoryUrl}/${id}`;
    return this.http.delete<Category>(url)
      .pipe(
        tap(_ => console.log('Deleted Successfully')),
        catchError(this.handleError('removeCategory', null))
      );
  }
  private getProducts(categoryId: string): Observable<Product[]> {
    const url = `${this.categoryUrl}/${categoryId}/products`;
    return this.http.get<Product[]>(url)
      .pipe(
        tap(products => this.log(`fetched ${products.length} products`)),
        catchError(this.handleError('getProducts', []))
      );
  }


}
