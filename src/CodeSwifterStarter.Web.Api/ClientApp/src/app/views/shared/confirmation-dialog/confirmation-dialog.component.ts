import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IConfirmationDialogData {
  title: string;
  body: string;
  confirmButton: string;
  cancelButton: string;
  twoButtons: boolean;
}

export class ConfirmationDialogData implements IConfirmationDialogData {
  title: string;
  body: string;
  confirmButton: string = 'Yes';
  cancelButton: string = 'No';
  twoButtons: boolean = true;

  constructor(init?: Partial<ConfirmationDialogData>) {
    if (!!init)
      Object.assign<ConfirmationDialogData, Partial<ConfirmationDialogData>>(this, init);
  }
}


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData) {}
}