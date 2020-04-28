import { Component, OnInit } from '@angular/core';
import {StudentApiService} from '../../../@core/service/api-service/student-api.service';
import {Student} from '../../../@core/model/student';
import {NbToastrService} from '@nebular/theme';
import {ErrorHandlingService} from '../../../@core/service/error-handling.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'ngx-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.scss'],
})
export class AllStudentsComponent implements OnInit {
  request_params = {
    page_size: 50,
    page_no: 0,
    name: '',
    student_id: '',
    nic: '',
  };
  allStudents: Student[] = [];
  constructor(private studentApiService: StudentApiService,
              private toastrService: NbToastrService) { }

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    const params: HttpParams = new HttpParams().set('search', 'true')
      .set('page_size', String(this.request_params.page_size))
      .set('page_no', String(this.request_params.page_no))
      .set('name', String(this.request_params.name))
      .set('student_id', String(this.request_params.student_id))
      .set('nic', String(this.request_params.nic));
    this.studentApiService.getAllStudents(params).subscribe(
      res => {
        this.allStudents = res;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }

  searchStudent() {
    this.request_params.page_no = 0;
    this.getAllStudents();
  }
}
