import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-angular-mat-dialog',
  templateUrl: './angular-mat-dialog.component.html',
  styleUrls: ['./angular-mat-dialog.component.scss'],
})
export class AngularMatDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AngularMatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
}
