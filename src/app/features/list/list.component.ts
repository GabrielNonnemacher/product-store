import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
export class ListComponent {
  products = signal<Product[]>(
    inject(ActivatedRoute).snapshot.data['products']
  );

  productsService = inject(ProductsService);
  modalService = inject(ModalService);
  router = inject(Router);

  public onEdit(id: string): void {
    this.router.navigate(['/edit-product', id]);
  }

  public onDelete(id: string): void {
    this.modalService
      .open()
      .pipe(filter((answer) => answer))
      .subscribe(() => {
        this.productsService.delete(id).subscribe(() => {
          this.productsService.getAll().subscribe((products) => {
            this.products.set(products);
          });
        });
      });
  }
}
