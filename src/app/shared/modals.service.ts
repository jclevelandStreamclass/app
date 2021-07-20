import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  ConfirmationData,
  ConfirmationModalComponent,
} from './modals/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  constructor(private dialog: MatDialog) {}

  alert(data: ConfirmationData): Observable<any> {
    return this.dialog
      .open(ConfirmationModalComponent, {
        data,
        width: '500px',
        disableClose: true,
      })
      .afterClosed();
  }
}
