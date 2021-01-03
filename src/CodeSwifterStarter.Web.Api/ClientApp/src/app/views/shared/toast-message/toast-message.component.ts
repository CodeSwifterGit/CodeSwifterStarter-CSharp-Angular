import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Component({
  selector: 'editor-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToastMessageComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string, actionName: string | null, trigger: Subject<boolean | null>}) { }

  ngOnInit(): void {
  }

  onAction(): boolean {
    this.data.trigger.next(true);
    return false;
  }
}
