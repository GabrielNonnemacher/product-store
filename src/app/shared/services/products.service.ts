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

  public getById(id: number) {
    return this.httpClient.get<Product>(`/api/products//${id}`);
  }

  public post(payload: ProductPayload) {
    return this.httpClient.post<Product>('/api/products', payload);
  }

  public put(id: string, payload: ProductPayload) {
    return this.httpClient.put<Product>(`/api/products/${id}`, payload);
  }
}
