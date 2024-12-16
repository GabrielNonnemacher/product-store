import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProductsService } from '../services/products.service';

export const getProduct = (route: ActivatedRouteSnapshot) => {
  const productsService = inject(ProductsService);
  return productsService.getById(route.params['id']);
};