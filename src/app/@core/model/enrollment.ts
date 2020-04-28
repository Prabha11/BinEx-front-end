import {ClassSession} from './class-session';
import {Student} from './student';
import {ClassSeries} from './class-series';

export interface Enrollment {
  id: number;
  classSeries: ClassSeries;
  student: Student;
  fee: number;
  completed: boolean;
  remark: string;
  cardType: string;
}
