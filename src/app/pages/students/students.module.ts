import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import {RouterModule} from '@angular/router';
import { NewStudentComponent } from './new-student/new-student.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import {StudentsRoutingModule} from './students-routing.module';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbDatepickerModule,
  NbDialogModule,
  NbInputModule, NbListModule,
  NbSelectModule, NbUserModule,
} from '@nebular/theme';
import {ConfirmationBoxComponent} from '../common-component/confirmation-box/confirmation-box.component';
import {CommonComponentModule} from '../common-component/common-component.module';
import {FormsModule} from '@angular/forms';
import { NewSchoolModalComponent } from './new-school-modal/new-school-modal.component';

@NgModule({
  declarations: [StudentsComponent, NewStudentComponent, AllStudentsComponent, NewSchoolModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    StudentsRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbSelectModule,
    NbDialogModule.forChild(),
    CommonComponentModule,
    FormsModule,
    NbDatepickerModule,
    NbListModule,
    NbUserModule,
  ],
  entryComponents: [
    ConfirmationBoxComponent,
    NewSchoolModalComponent,
  ],
})
export class StudentsModule { }
