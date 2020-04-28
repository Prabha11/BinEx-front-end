import {ClassSeries} from './class-series';
import {Student} from './student';

export interface Payment {
  id: number;
  classSeries: ClassSeries;
  month: string;
  student: Student;
  amount: number;
  date: Date;
}
