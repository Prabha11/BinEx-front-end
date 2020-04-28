import {Time} from '@angular/common';
import {ClassSeries} from './class-series';

export interface ClassSession {
  id: number;
  date: Date;
  startTime: Time;
  remark: string;
  classSeries: ClassSeries;
  finished: boolean;
}
