import {FileStructure} from './file-structure';

export interface ExecutionRequest {
  id: number;
  dataset: string;
  inputFile1: FileStructure;
  inputFile2: FileStructure;
  inputFile3: FileStructure;
  inputFile4: FileStructure;
  inputFile5: FileStructure;
  inputFile6: FileStructure;
  outputFile: FileStructure;
}
