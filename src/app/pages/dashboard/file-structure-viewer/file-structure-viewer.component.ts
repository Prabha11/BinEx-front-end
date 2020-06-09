import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FileStructure} from '../../../@core/model/file-structure';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {FileApiService} from '../../../@core/service/api-service/file-api.service';

@Component({
  selector: 'ngx-file-structure-viewer',
  templateUrl: './file-structure-viewer.component.html',
  styleUrls: ['./file-structure-viewer.component.scss'],
})
export class FileStructureViewerComponent implements OnInit {
  @ViewChild('uploadBox', {static: false}) uploadBox: TemplateRef<any>;
  @Input() fileStructure: FileStructure;
  @Input() fileSelectorDialog: NbDialogRef<any>;
  currentFolder: FileStructure = null;
  parentFolder: FileStructure = null;
  selectedFile: FileStructure = null;
  private fileToUpload: File = null;

  constructor(private dialogService: NbDialogService,
              private fileApiService: FileApiService) {
  }

  ngOnInit() {
    this.openFolder(this.fileStructure);
  }

  selectFile(file: FileStructure) {
    this.selectedFile = file;
  }

  openFolder(folder: FileStructure) {
    this.parentFolder = this.currentFolder;
    this.currentFolder = folder;
  }

  goBack() {
    this.currentFolder = this.parentFolder;
  }

  goHome() {
    this.openFolder(this.fileStructure);
  }

  openFileUploadBox() {
    this.dialogService.open(this.uploadBox);
  }

  uploadFile() {
    this.fileApiService.postNewFile(this.fileToUpload, this.currentFolder.id).subscribe(
      res => {
      },
      err => {
      },
    );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  cancel() {
    this.fileSelectorDialog.close();
  }

  submit(file: FileStructure) {
    this.fileSelectorDialog.close(file);
  }

}
