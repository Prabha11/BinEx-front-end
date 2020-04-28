import {Component, OnInit} from '@angular/core';
import {ErrorHandlingService} from '../../../@core/service/error-handling.service';
import {ClassSeriesApiService} from '../../../@core/service/api-service/class-series-api.service';
import {ClassSeries} from '../../../@core/model/class-series';
import {NbToastrService} from '@nebular/theme';
import {ClassSession} from '../../../@core/model/class-session';
import {ClassSessionApiService} from "../../../@core/service/api-service/class-session-api.service";

@Component({
  selector: 'ngx-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss'],
})
export class AttendanceReportComponent implements OnInit {
  allClassSeries: ClassSeries[] = [];
  private selectedClassSeries: ClassSeries = null;
  classSessionsForSessionOne: ClassSession[] = [];
  classSessionsForSessionTwo: ClassSession[] = [];
  selectedClassSessionOne: ClassSession = null;
  selectedClassSessionTwo: ClassSession = null;

  constructor(private classSeriesApiService: ClassSeriesApiService,
              private classSessionApiService: ClassSessionApiService,
              private toastrService: NbToastrService) {
  }

  ngOnInit() {
    this.loadAllClassSeries();
  }

  loadAllClassSeries() {
    this.classSeriesApiService.getAllClassSeries().subscribe(
      res => {
        this.allClassSeries = res;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }

  loadClassSessionsForClassSessionOneByDate(date: Date) {
    this.classSessionApiService.getClassSessionsByClassSeriesIdAndDate(this.selectedClassSeries.id, date).subscribe(
      res => {
        this.classSessionsForSessionOne = res;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }

  loadClassSessionsForClassSessionTwoByDate(date: Date) {
    this.classSessionApiService.getClassSessionsByClassSeriesIdAndDate(this.selectedClassSeries.id, date).subscribe(
      res => {
        this.classSessionsForSessionTwo = res;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }

  selectClassSeries(classSeries: ClassSeries) {
    this.selectedClassSeries = classSeries;
  }

  selectClassSessionOne(classSession: ClassSession) {
    this.selectedClassSessionOne = classSession;
  }

  selectClassSessionTwo(classSession: ClassSession) {
    this.selectedClassSessionTwo = classSession;
  }

  getSessionIdentifier(classSession: ClassSession) {
    return new Date(classSession.date).toDateString() + classSession.startTime;
  }
}
