import {FileStructure} from './file-structure';

export interface ExecutionRequest {
  id: number;
  dataset: string;
  emailAddress: string;
  inputFile1: FileStructure;
  inputFile2: FileStructure;
  inputFile3: FileStructure;
  outputFile: FileStructure;
}
