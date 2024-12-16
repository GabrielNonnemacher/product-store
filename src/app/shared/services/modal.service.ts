import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../features/list/components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  matDialog = inject(MatDialog);

  open(): Observable<boolean> {
    return this.matDialog.open(ModalComponent).afterClosed();
  }
}
