import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {FileApiService} from '../../@core/service/api-service/file-api.service';
import {ErrorHandlingService} from '../../@core/service/error-handling.service';
import {FileStructure} from '../../@core/model/file-structure';
import {ExecutionApiService} from '../../@core/service/api-service/execution-api.service';
import {ExecutionRequest} from '../../@core/model/execution-request';
import {JobCard} from '../../@core/model/job-card';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  @ViewChild('uploadBox', {static: false}) uploadBox: TemplateRef<any>;
  @ViewChild('fileViewer', {static: false}) fileViewer: TemplateRef<any>;
  @ViewChild('processStarter', {static: false}) processStarter: TemplateRef<any>;
  fileToUpload: File = null;
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
    outputFile: {
      id: null,
      folder: null,
      name: null,
      childFileStructures: null,
      user: null,
    },
  };
  processLoading: boolean = false;
  percentages: { value: number, name: string }[] = [];
  fetched: boolean = false;
  methodName: string = 'Previous method';
  binNames: string[] = [];
  binValuesOld: number[] = [];
  binValuesNew: number[] = [];

  resultFileId: number = null;
  allJobs: JobCard[] = [];

  constructor(private dialogService: NbDialogService,
              private toastrService: NbToastrService,
              private executionApiService: ExecutionApiService,
              private fileApiService: FileApiService) {
  }

  ngOnInit(): void {
    this.getFilesList();
    this.loadJobCards();
  }

  openFileUploadBox() {
    this.dialogService.open(this.uploadBox);
  }

  openFileViewer() {
    this.getFilesList();
    this.dialogService.open(this.fileViewer);
  }

  uploadFile() {
    this.fileApiService.postNewFile(this.fileToUpload, 1).subscribe(
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

  fetchResult(orderId: number) {
    this.fetched = false;
    this.executionApiService.getResult(orderId).subscribe(
      res => {
        const binExPercentage = res.executionResponseData.newPercentage - res.executionResponseData.oldPercentage;
        const unbinnedPercentage = 100 - res.executionResponseData.newPercentage;
        this.percentages = [
          {value: res.executionResponseData.oldPercentage, name: 'Previous method'},
          {value: binExPercentage, name: 'With BinEx'},
          {value: unbinnedPercentage, name: 'Unbinned'},
        ];

        const binNames: string[] = [];
        const binValuesOld: number[] = [];
        const binValuesNew: number[] = [];

        for (const bin of res.executionResponseData.bins) {
          binNames.push(bin.binName);
          binValuesOld.push(bin.numberOfContigsInOldBin);
          binValuesNew.push(bin.numberOfContigsInNewBin);
        }

        this.binNames = binNames;
        this.binValuesOld = binValuesOld;
        this.binValuesNew = binValuesNew;

        this.resultFileId = res.outputFile.id;

        this.fetched = true;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
        this.fetched = false;
      },
    );
  }

  runExecution() {
    this.processLoading = true;
    this.executionApiService.executeProcess(this.executionRequest).subscribe(
      res => {
        this.executionResult = res.toString();
        this.fetchResult(res.executionOrderID);
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

  downloadResult(fileId: number) {
    this.fileApiService.downloadFile(fileId);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  private loadJobCards() {
    this.executionApiService.getJobCards().subscribe(
      res => {
        this.allJobs = res;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }
}
