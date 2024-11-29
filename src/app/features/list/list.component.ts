import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  productsService = inject(ProductsService);
  products: Product[] = [] as Product[];

  public ngOnInit(): void {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;      
    });
  }
}
