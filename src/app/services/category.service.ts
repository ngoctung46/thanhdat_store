import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private categoryUrl = 'api/category';
  private productUrl = 'api/product';
  constructor(private http: HttpClient) {}

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

  private getProducts(categoryId: string): Observable<any[]> {
    const url = `${this.categoryUrl}/${categoryId}/products`;
    return this.http.get<any[]>(url)
      .pipe(
        tap(products => this.log(`fetched ${products.length} products`)),
        catchError(this.handleError('getProducts',[]))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private log(message: string) {
    console.log(`CategoryService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
