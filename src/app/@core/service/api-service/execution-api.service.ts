import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CoreUrlService} from '../url-service/core-url.service';
import {ExecutionRequest} from '../../model/execution-request';
import {JobCard} from '../../model/job-card';

@Injectable({
  providedIn: 'root',
})
export class ExecutionApiService {

  EXEC_URL = `${this.coreUrlService.BASE_URL}/exec`;

  constructor(private coreUrlService: CoreUrlService, private  http: HttpClient) { }

  executeProcess(executionRequest: ExecutionRequest): Observable<JobCard> {
    return this.http.post<JobCard>(this.EXEC_URL + '/run', executionRequest);
  }
}
