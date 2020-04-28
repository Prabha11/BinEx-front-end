import {Component, Input, OnInit} from '@angular/core';
import {Enrollment} from '../../../@core/model/enrollment';
import {Student} from '../../../@core/model/student';
import {ClassSeries} from '../../../@core/model/class-series';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {EnrollmentApiService} from '../../../@core/service/api-service/enrolment-api.service';
import {ErrorHandlingService} from '../../../@core/service/error-handling.service';

@Component({
  selector: 'ngx-add-enrolment-dialog',
  templateUrl: './add-enrolment-dialog.component.html',
  styleUrls: ['./add-enrolment-dialog.component.scss'],
})
export class AddEnrolmentDialogComponent implements OnInit {
  @Input() classSeries: ClassSeries;
  @Input() student: Student;
  @Input() dialogRef: NbDialogRef<any>;
  templateForNewEnrollment: Enrollment = {
    cardType: 'PAYED', classSeries: undefined, completed: false, fee: 0, id: null, remark: '', student: undefined,
  };
  cardTypes: string[] = ['PAYED', 'HALF', 'FREE'];

  constructor(private enrollmentApiService: EnrollmentApiService,
              private toastrService: NbToastrService) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  submit(returnValue: Enrollment) {
    this.dialogRef.close(returnValue);
  }

  addEnrollment() {
    this.templateForNewEnrollment.classSeries = this.classSeries;
    this.templateForNewEnrollment.student = this.student;
    this.enrollmentApiService.postNewEnrollment(this.templateForNewEnrollment).subscribe(
      res => {
        this.toastrService.success('Enrollment added successfully', 'Successful!');
        this.submit(res);
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }
}
