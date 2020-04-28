import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ClassSeries} from '../../../@core/model/class-series';
import {ClassSeriesApiService} from '../../../@core/service/api-service/class-series-api.service';
import {ClassSessionApiService} from '../../../@core/service/api-service/class-session-api.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {StudentApiService} from '../../../@core/service/api-service/student-api.service';
import {AttendanceApiService} from '../../../@core/service/api-service/attendance-api.service';
import {ErrorHandlingService} from '../../../@core/service/error-handling.service';
import {ClassSession} from '../../../@core/model/class-session';
import {Attendance} from '../../../@core/model/attendance';
import {Student} from '../../../@core/model/student';

interface Alert {
  status: 'success' | 'danger' | 'warning';
  subject: string;
  message: string;
}

@Component({
  selector: 'ngx-check-in-terminal',
  templateUrl: './check-in-terminal.component.html',
  styleUrls: ['./check-in-terminal.component.scss'],
})
export class CheckInTerminalComponent implements OnInit {
  @ViewChild('enrollmentConfirmation', {static: false}) enrollmentConfirmation: TemplateRef<any>;
  @ViewChild('addEnrollment', {static: false}) addEnrollment: TemplateRef<any>;
  @ViewChild('alertBoxSettings', {static: false}) alertBoxSettings: TemplateRef<any>;

  allClassSeries: ClassSeries[] = [];
  classSessionsForSelectedClassSeries: ClassSession[] = [];
  selectedClassSeries: ClassSeries;
  selectedClassSession: ClassSession;
  inputStudentId: number;
  lastAttendance: Attendance;
  selectedStudent: Student;
  alerts: Alert[] = [];
  notificationQueueSize = 8;
  notificationTypeAlertList: boolean = false;

  constructor(private classSeriesApiService: ClassSeriesApiService,
              private classSessionApiService: ClassSessionApiService,
              private studentApiService: StudentApiService,
              private attendanceApiService: AttendanceApiService,
              private toastrService: NbToastrService,
              private dialogService: NbDialogService) {
  }

  ngOnInit() {
    this.loadAllClassSeries();
  }

  loadAllClassSeries() {
    this.classSeriesApiService.getActiveClassSeries().subscribe(
      res => {
        this.allClassSeries = res;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }

  loadClassSessions(classSeriesId: number) {
    this.classSessionApiService.getUnfinishedClassSessionsByClassSeriesId(classSeriesId).subscribe(
      res => {
        this.classSessionsForSelectedClassSeries = res;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }

  selectClassSeries(classSeries: ClassSeries) {
    this.selectedClassSeries = classSeries;
    this.loadClassSessions(classSeries.id);
    if (this.selectedClassSession && this.selectedClassSession.classSeries.id !== this.selectedClassSeries.id) {
      this.selectedClassSession = null;
    }
  }

  selectClassSession(classSession: ClassSession) {
    this.selectedClassSession = classSession;
  }

  getStudentAndAddAttendanceAttempt() {
    this.studentApiService.getStudentsById(this.inputStudentId).subscribe(
      res => {
        this.selectedStudent = res;
        this.addAttendanceAttempt(res);
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }

  addAttendanceAttempt(student: Student) {
    const templateAttendance: Attendance = {
      classSession: this.selectedClassSession,
      id: null,
      student: student,
      time: undefined,
    };
    this.attendanceApiService.postNewAttendance(templateAttendance).subscribe(
      nestedRes => {
        if (nestedRes.id) {
          this.lastAttendance = nestedRes;
          this.pushAlert({status: 'success', subject: student.name, message: 'Attended'});
        } else {
          // @ts-ignore
          this.handleAttendanceAttemptErrors(nestedRes, student);
        }
      },
      err => {
        this.handleAttendanceAttemptErrors(err.error, student);
      },
    );
  }

  handleAttendanceAttemptErrors(error: Error, student: Student) {
    this.pushAlert({status: 'danger', subject: student.name, message: error.message});
    this.toastrService.danger(error.message, 'Attendance adding failed');
  }

  getDate(date: Date) {
    return new Date(date).toDateString();
  }

  pushAlert(alert: Alert) {
    const newAlertArray: Alert[] = [];
    newAlertArray.push(alert);
    if (this.alerts.length >= this.notificationQueueSize) {
      newAlertArray.push.apply(newAlertArray, this.alerts.splice(0, this.notificationQueueSize - 1));
    } else {
      newAlertArray.push.apply(newAlertArray, this.alerts);
    }
    this.alerts = newAlertArray;
  }

  openAddEnrollment() {
    this.dialogService.open(this.addEnrollment).onClose.subscribe();
  }

  openAlertSettings() {
    this.dialogService.open(this.alertBoxSettings);
  }
}
