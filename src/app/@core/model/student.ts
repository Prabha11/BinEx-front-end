import {School} from './school';

export interface Student {
  id: number;
  name: string;
  nic: string;
  address: string;
  contact: string;
  studentId: string;
  gender: string;
  birthday: Date;
  school: School;
  remark: string;
}
