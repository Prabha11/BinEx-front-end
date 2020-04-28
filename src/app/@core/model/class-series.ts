import {Time} from '@angular/common';

export interface ClassSeries {
  id: number;
  description: string;
  type: string;
  location: string;
  time: Time;
  active: boolean;
}
