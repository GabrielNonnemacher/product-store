import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Product } from '../../shared/interfaces/product.interface';
import { ModalService } from '../../shared/services/modal.service';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  products: Product[] = [] as Product[];

  productsService = inject(ProductsService);
  modalService = inject(ModalService);
  router = inject(Router);

  public ngOnInit(): void {
    this.getAll();
  }

  private getAll(): void {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  public onEdit(id: string): void {
    this.router.navigate(['/edit-product', id]);
  }

  public onDelete(id: string): void {
    this.modalService
      .open()
      .pipe(filter((answer) => answer))
      .subscribe(() => {
        this.productsService.delete(id).subscribe(() => this.getAll());
      });
  }
}
