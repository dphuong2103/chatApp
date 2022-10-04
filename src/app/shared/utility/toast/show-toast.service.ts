import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularMatDialogComponent } from './../angular-mat-dialog/angular-mat-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ShowToastService {
  data: any;
  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) {}

  openDialog() {
    const dialogRef = this.dialog.open(AngularMatDialogComponent, {
      data: this.data,
    });
  }

  openSnackBar(message: string, action: string) {
    console.log('toast open');
    this._snackBar.open(message, action, { duration: 3000 });
  }
}
