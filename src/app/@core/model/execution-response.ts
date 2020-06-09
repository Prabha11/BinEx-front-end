import {FileStructure} from './file-structure';
import {ExecutionResponseData} from './execution-response-data';

export interface ExecutionResponse {
  dataset: string;
  inputFile1: FileStructure;
  inputFile2: FileStructure;
  inputFile3: FileStructure;
  outputFile: FileStructure;
  executionResponseData: ExecutionResponseData;
}
