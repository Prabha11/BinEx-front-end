import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationBoxComponent } from './confirmation-box/confirmation-box.component';
import {ReversePipe} from './reverse.pipe';
import {NbButtonModule, NbCardModule} from "@nebular/theme";
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [ConfirmationBoxComponent, ReversePipe, PaginationComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
  ],
  exports: [
    ReversePipe,
    ConfirmationBoxComponent
  ]
})
export class CommonComponentModule { }
