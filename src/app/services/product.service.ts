import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Product } from '@interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string = `${environment.apiUrl}`;
  private jwt: string = this.cookieService.get('JWT');

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      headers: this.headers(),
    });
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`, {
      headers: this.headers(),
    });
  }

  public setProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, data, {
      headers: this.headers(),
    });
  }

  public updateProduct(id: number, data: Product) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, data, {
      headers: this.headers(),
    });
  }

  public deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/products/${id}`, {
      headers: this.headers(),
    });
  }

  private headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.jwt}`,
    });
  }
}
