import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CoreUrlService} from '../url-service/core-url.service';
import {FileStructure} from '../../model/file-structure';

@Injectable({
  providedIn: 'root',
})
export class FileApiService {

  FILE_URL = `${this.coreUrlService.BASE_URL}/file`;
  FILES_URL = `${this.coreUrlService.BASE_URL}/files`;

  constructor(private coreUrlService: CoreUrlService, private  http: HttpClient) { }

  getListOfAllFiles(): Observable<FileStructure[]> {
    return this.http.get<FileStructure[]>(this.FILES_URL);
  }

  getFilesById(id: number): Observable<File> {
    return this.http.get<File>(this.FILES_URL + '/' + id);
  }

  postNewFile(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('one', 'file');

    const req = new HttpRequest('POST', `${this.FILE_URL}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
    // const params: HttpParams = new HttpParams().set('file', String(fileContainer.file));
    // return this.http.post<string>(this.FILE_URL + '/upload' , fileContainer, {params: params});
  }

  deleteFile(id: number): any {
    return this.http.delete(this.FILE_URL + '/' + id);
  }

}
