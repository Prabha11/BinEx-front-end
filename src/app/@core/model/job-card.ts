import {User} from '../data/users';

export interface JobCard {
  id: number;
  executionOrderID: number;
  cardName: string;
  user: User;
}
