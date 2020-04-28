import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AttendanceComponent} from './attendance.component';
import {CheckInTerminalComponent} from './check-in-terminal/check-in-terminal.component';
import {AttendanceReportComponent} from './attendance-report/attendance-report.component';

const routes: Routes = [{
  path: '',
  component: AttendanceComponent,
  children: [
    {
      path: 'check-in',
      component: CheckInTerminalComponent,
    },
    {
      path: 'attendance-report',
      component: AttendanceReportComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRoutingModule {
}
