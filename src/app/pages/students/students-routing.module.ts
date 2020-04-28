import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StudentsComponent} from './students.component';
import {NewStudentComponent} from './new-student/new-student.component';
import {AllStudentsComponent} from './all-students/all-students.component';

const routes: Routes = [{
  path: '',
  component: StudentsComponent,
  children: [
    {
      path: 'add-new',
      component: NewStudentComponent,
    },
    {
      path: 'view-all',
      component: AllStudentsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {
}
