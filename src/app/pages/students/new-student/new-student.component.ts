import {Component, OnInit} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {Student} from '../../../@core/model/student';
import {SchoolApiService} from '../../../@core/service/api-service/school-api.service';
import {School} from '../../../@core/model/school';
import {StudentApiService} from '../../../@core/service/api-service/student-api.service';
import {ErrorHandlingService} from '../../../@core/service/error-handling.service';
import {NewSchoolModalComponent} from '../new-school-modal/new-school-modal.component';

@Component({
  selector: 'ngx-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss'],
})
export class NewStudentComponent implements OnInit {
  templateForNewStudent: Student = {
    studentId: '',
    id: null,
    nic: '',
    name: '',
    address: '',
    birthday: undefined,
    contact: '',
    gender: '',
    remark: '',
    school: undefined,
  };
  allSchools: School[];

  constructor(private dialogService: NbDialogService,
              private schoolApiService: SchoolApiService,
              private studentApiService: StudentApiService,
              private toastrService: NbToastrService) {
  }

  ngOnInit() {
    this.getAllSchools();
  }

  getAllSchools() {
    this.schoolApiService.getAllSchools().subscribe(
      res => {
        this.allSchools = res;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }

  addNewStudent() {
    this.studentApiService.postNewStudent(this.templateForNewStudent).subscribe(
      res => {
        this.toastrService.success('Student added successfully!', 'Successful');
        this.clearStudentTemplate();
      },
      err => {
        this.toastrService.danger('Student adding failed!', 'Problem occurred!');
      },
    );
  }

  clearStudentTemplate() {
    const empty: Student = {
      studentId: '',
      id: null,
      nic: '',
      name: '',
      address: '',
      birthday: undefined,
      contact: '',
      gender: '',
      remark: '',
      school: undefined,
    };
    Object.assign(this.templateForNewStudent, empty);
  }

  requestNewSchool() {
    this.dialogService.open(NewSchoolModalComponent).onClose.subscribe(
      res => {
        if (res) {
          this.allSchools.push(res);
          this.templateForNewStudent.school = res;
        }
      },
    );
  }
}
