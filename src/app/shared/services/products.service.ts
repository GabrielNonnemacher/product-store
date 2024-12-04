import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductPayload } from '../interfaces/payload-product.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient = inject(HttpClient);

  public getAll() {
    return this.httpClient.get<Product[]>('/api/products');
  }

  public post(payload: ProductPayload) {
    return this.httpClient.post<Product>('/api/products', payload);
  }
}
