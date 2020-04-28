import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss'],
})
export class ConfirmationBoxComponent implements OnInit {
  @Input() message: string;
  @Input() confirmationBoxDialogRef: NbDialogRef<any>;
  @Output() onYes: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.confirmationBoxDialogRef.close();
  }

  submit(returnValue: boolean) {
    this.confirmationBoxDialogRef.close(returnValue);
  }

}
