import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  matDialogRef = inject(MatDialogRef);

  public onOk(): void {
    this.matDialogRef.close(true);
  }

  public onCancel(): void {
    this.matDialogRef.close(false);
  }
}
