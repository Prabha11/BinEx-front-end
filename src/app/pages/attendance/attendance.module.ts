import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import {RouterModule} from '@angular/router';
import { CheckInTerminalComponent } from './check-in-terminal/check-in-terminal.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import {AttendanceRoutingModule} from './attendance-routing.module';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule, NbDatepickerModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule
} from "@nebular/theme";
import {FormsModule} from "@angular/forms";
import {CommonComponentModule} from "../common-component/common-component.module";
import { AddEnrolmentDialogComponent } from './add-enrolment-dialog/add-enrolment-dialog.component';

@NgModule({
  declarations: [AttendanceComponent, CheckInTerminalComponent, AttendanceReportComponent, AddEnrolmentDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    AttendanceRoutingModule,
    NbCardModule,
    NbSelectModule,
    FormsModule,
    NbInputModule,
    NbUserModule,
    NbAlertModule,
    CommonComponentModule,
    NbButtonModule,
    NbRadioModule,
    NbCheckboxModule,
    NbDatepickerModule,
  ],
})
export class AttendanceModule { }
