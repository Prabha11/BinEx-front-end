import {Time} from '@angular/common';
import {Student} from './student';
import {ClassSession} from './class-session';

export interface Attendance {
  id: number;
  classSession: ClassSession;
  student: Student;
  time: Time;
}
