import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ClassSeriesApiService} from '../../../@core/service/api-service/class-series-api.service';
import {ClassSessionApiService} from '../../../@core/service/api-service/class-session-api.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ClassSeries} from '../../../@core/model/class-series';
import {ErrorHandlingService} from '../../../@core/service/error-handling.service';
import {ClassSession} from '../../../@core/model/class-session';

@Component({
  selector: 'ngx-all-class-series',
  templateUrl: './all-class-series.component.html',
  styleUrls: ['./all-class-series.component.scss'],
})
export class AllClassSeriesComponent implements OnInit {
  @ViewChild('newSeriesModal', {static: false}) newSeriesModal: TemplateRef<any>;
  @ViewChild('newSessionModal', {static: false}) newSessionModal: TemplateRef<any>;
  @ViewChild('finishSessionConfirmation', {static: false}) finishSessionConfirmation: TemplateRef<any>;
  @ViewChild('deactivateClassSeriesConfirmation', {static: false}) deactivateClassSeriesConfirmation: TemplateRef<any>;
  allClassSeries: ClassSeries[] = [];
  templateForNewClassSeries: ClassSeries = {
    description: '',
    id: null,
    location: '',
    time: undefined,
    type: '',
    active: false,
  };
  loadingNewSeries: boolean = false;
  loadingAllSeries: boolean = false;
  loadingClassSessions: boolean = false;
  loadingNewClassSession: boolean = false;
  selectedClassSeries: ClassSeries;
  classSessionsOfSelectedSeries: ClassSession[];
  newSession: ClassSession = {
    id: null, classSeries: null, date: undefined, remark: '', startTime: undefined, finished: false,
  };

  constructor(private classSeriesApiService: ClassSeriesApiService,
              private classSessionApiService: ClassSessionApiService,
              private dialogService: NbDialogService,
              private toastrService: NbToastrService) {
  }

  ngOnInit() {
    this.getAllClassSeries();
  }

  getAllClassSeries() {
    this.loadingAllSeries = true;
    this.classSeriesApiService.getActiveClassSeries().subscribe(
      res => {
        this.allClassSeries = res;
        this.loadingAllSeries = false;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
        this.loadingAllSeries = false;
      },
    );
  }

  newSeriesRequest() {
    this.dialogService.open(this.newSeriesModal);
  }

  newClassSeries(ref) {
    this.loadingNewSeries = true;
    this.classSeriesApiService.postNewClassSeries(this.templateForNewClassSeries).subscribe(
      res => {
        this.allClassSeries.push(res);
        ref.close();
        this.toastrService.success('Class series added successfully!', 'Successful');
        this.loadingNewSeries = false;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
        this.loadingNewSeries = false;
      },
    );
  }

  selectClassSeries(classSeries: ClassSeries) {
    this.selectedClassSeries = classSeries;
    this.loadingClassSessions = true;
    this.classSessionApiService.getUnfinishedClassSessionsByClassSeriesId(classSeries.id).subscribe(
      res => {
        this.classSessionsOfSelectedSeries = res;
        this.loadingClassSessions = false;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
        this.loadingClassSessions = false;
      },
    );
  }

  newSessionRequest() {
    this.newSession.date = new Date();
    this.dialogService.open(this.newSessionModal);
  }

  newClassSession(ref) {
    this.newSession.classSeries = this.selectedClassSeries;
    this.loadingNewClassSession = true;
    this.classSessionApiService.postNewClassSession(this.newSession).subscribe(
      res => {
        this.classSessionsOfSelectedSeries.push(res);
        this.selectClassSeries(this.selectedClassSeries);
        this.loadingNewClassSession = false;
        this.toastrService.success('Success!', 'Class session added successfully!');
        ref.close();
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
        this.loadingNewClassSession = false;
      },
    );
  }

  getDate(date: Date) {
    return new Date(date).toDateString();
  }

  finishSessionRequest(session: ClassSession) {
    this.dialogService.open(this.finishSessionConfirmation)
      .onClose.subscribe(
      res => {
        if (res === true) {
          this.finishSession(session);
        }
      },
    );

  }

  deactivateClassSeriesRequest(classSeries: ClassSeries) {
    this.dialogService.open(this.deactivateClassSeriesConfirmation)
      .onClose.subscribe(
      res => {
        if (res === true) {
          this.deactivateClassSeries(classSeries);
        }
      },
    );

  }

  finishSession(session: ClassSession) {
    this.classSessionApiService.finishClassSessionsById(session.id).subscribe(
      res => {
        this.toastrService.success('Class session finished', 'Successful!');
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }

  private deactivateClassSeries(classSeries: ClassSeries) {
    this.classSeriesApiService.deactivateClassSeriesById(classSeries.id).subscribe(
      res => {
        this.toastrService.success('Class Series deactivated successfully', 'Successful!');
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }
}
