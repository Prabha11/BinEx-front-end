import {User} from './user';

export interface FileStructure {
  id: number;
  folder: boolean;
  name: string;
  childFileStructures: FileStructure[];
  user: User;
}
