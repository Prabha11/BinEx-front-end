import { Component, OnInit } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {School} from '../../../@core/model/school';
import {SchoolApiService} from '../../../@core/service/api-service/school-api.service';
import {ErrorHandlingService} from '../../../@core/service/error-handling.service';

@Component({
  selector: 'ngx-new-school-modal',
  templateUrl: './new-school-modal.component.html',
  styleUrls: ['./new-school-modal.component.scss'],
})
export class NewSchoolModalComponent implements OnInit {
  templateForNewSchool: School = {
    id: null,
    address: '',
    category: '',
    contact: '',
    name: '',
  };

  constructor(protected newSchoolModalComponentNbDialogRef: NbDialogRef<NewSchoolModalComponent>,
              private schoolApiService: SchoolApiService,
              private toastrService: NbToastrService) { }

  ngOnInit() {
  }

  cancel() {
    this.newSchoolModalComponentNbDialogRef.close();
  }

  submit(returnValue: School) {
    this.newSchoolModalComponentNbDialogRef.close(returnValue);
  }

  newSchool() {
    this.schoolApiService.postNewSchool(this.templateForNewSchool).subscribe(
      res => {
        this.toastrService.success('School added successfully', 'Successful!');
        this.submit(res);
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }
}
