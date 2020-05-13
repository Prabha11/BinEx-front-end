import {Component, Input, OnInit} from '@angular/core';
import {FileStructure} from '../../../@core/model/file-structure';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-file-structure-viewer',
  templateUrl: './file-structure-viewer.component.html',
  styleUrls: ['./file-structure-viewer.component.scss'],
})
export class FileStructureViewerComponent implements OnInit {
  @Input() fileStructure: FileStructure;
  @Input() fileSelectorDialog: NbDialogRef<any>;
  currentFolder: FileStructure = null;
  parentFolder: FileStructure = null;
  selectedFile: FileStructure = null;

  constructor() {
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

  cancel() {
    this.fileSelectorDialog.close();
  }

  submit(file: FileStructure) {
    this.fileSelectorDialog.close(file);
  }

}
