import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';

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
  router = inject(Router);
  matDialog = inject(MatDialog);

  public ngOnInit(): void {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  public onEdit(id: string): void {
    this.router.navigate(['/edit-product', id]);
  }

  public onDelete(id: string): void {
    this.matDialog
      .open(ModalComponent, {})
      .afterClosed()
      .pipe(filter((answer) => answer))
      .subscribe(() => {
        this.productsService.delete(id).subscribe(() => {
          this.productsService.getAll().subscribe((products) => {
            this.products = products;
          });
        });
      });
  }
}
