import {FileStructure} from './file-structure';
import {BinData} from './bin-data';

export interface ExecutionResponseData {
  id: number;
  bins: BinData[];
  result: FileStructure;
  oldPercentage: number;
  newPercentage: number;
  oldAccuracy: number;
  newAccuracy: number;
}
