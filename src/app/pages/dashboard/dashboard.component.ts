import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {FileApiService} from '../../@core/service/api-service/file-api.service';
import {ErrorHandlingService} from '../../@core/service/error-handling.service';
import {FileStructure} from '../../@core/model/file-structure';
import {ExecutionApiService} from '../../@core/service/api-service/execution-api.service';
import {ExecutionRequest} from '../../@core/model/execution-request';
import {JobCard} from '../../@core/model/job-card';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  @ViewChild('uploadBox', {static: false}) uploadBox: TemplateRef<any>;
  @ViewChild('fileViewer', {static: false}) fileViewer: TemplateRef<any>;
  @ViewChild('processStarter', {static: false}) processStarter: TemplateRef<any>;
  fileToUpload: any;
  filesList: FileStructure[] = [];
  fileStructure: FileStructure;
  executionResult: String = '';
  jobCards: JobCard[] = [];
  executionRequest: ExecutionRequest = {
    dataset: '',
    emailAddress: '',
    id: null,
    inputFile1: null,
    inputFile2: null,
    inputFile3: null,
    inputFile4: null,
    inputFile5: null,
    inputFile6: null,
    inputFile7: null,
    outputFile: {
      id: null,
      folder: null,
      name: null,
      childFileStructures: null,
      user: null,
    },
  };
  processLoading: boolean = false;

  constructor(private dialogService: NbDialogService,
              private toastrService: NbToastrService,
              private executionApiService: ExecutionApiService,
              private fileApiService: FileApiService) {
  }

  ngOnInit(): void {
    this.getFilesList();
  }

  openFileUploadBox() {
    this.dialogService.open(this.uploadBox);
  }

  openFileViewer() {
    this.getFilesList();
    this.dialogService.open(this.fileViewer);
  }

  uploadFile() {
    this.fileApiService.postNewFile(this.fileToUpload).subscribe(
      res => {
      },
      err => {
      },
    );
  }

  private getFilesList() {
    this.fileApiService.getListOfAllFiles().subscribe(
      res => {
        const root: FileStructure = {childFileStructures: res, folder: true, id: 0, name: 'Root', user: undefined};
        this.filesList = res[0].childFileStructures;
        this.fileStructure = root;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }

  runExecution() {
    this.processLoading = true;
    this.executionApiService.executeProcess(this.executionRequest).subscribe(
      res => {
        this.executionResult = res.toString();
        this.processLoading = false;
      },
      err => {
        this.executionResult = err.toString();
        this.processLoading = false;
      },
    );
  }

  openProcessStarter() {
    this.dialogService.open(this.processStarter);
  }

  selectFile1(inputFile: FileStructure) {
    this.dialogService.open(this.fileViewer).onClose.subscribe(
      res => {
        this.executionRequest.inputFile1 = res;
      },
    );
  }

  selectFile2(inputFile: FileStructure) {
    this.dialogService.open(this.fileViewer).onClose.subscribe(
      res => {
        this.executionRequest.inputFile2 = res;
      },
    );
  }

  selectFile3(inputFile: FileStructure) {
    this.dialogService.open(this.fileViewer).onClose.subscribe(
      res => {
        this.executionRequest.inputFile3 = res;
      },
    );
  }

  selectFile4(inputFile: FileStructure) {
    this.dialogService.open(this.fileViewer).onClose.subscribe(
      res => {
        this.executionRequest.inputFile4 = res;
      },
    );
  }

  selectFile5(inputFile: FileStructure) {
    this.dialogService.open(this.fileViewer).onClose.subscribe(
      res => {
        this.executionRequest.inputFile5 = res;
      },
    );
  }

  selectFile6(inputFile: FileStructure) {
    this.dialogService.open(this.fileViewer).onClose.subscribe(
      res => {
        this.executionRequest.inputFile6 = res;
      },
    );
  }

  selectFile7(inputFile: FileStructure) {
    this.dialogService.open(this.fileViewer).onClose.subscribe(
      res => {
        this.executionRequest.inputFile7 = res;
      },
    );
  }
}
