import {Injectable} from '@angular/core';
import {CoreUrlService} from '../url-service/core-url.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClassSession} from '../../model/class-session';

@Injectable({
  providedIn: 'root',
})
export class ClassSessionApiService {
  CLASS_SESSION_URL = `${this.coreUrlService.BASE_URL}/class-session`;
  CLASS_SESSIONS_URL = `${this.coreUrlService.BASE_URL}/class-sessions`;

  constructor(private coreUrlService: CoreUrlService, private  http: HttpClient) {
  }

  getAllClassSessions(): Observable<ClassSession[]> {
    return this.http.get<ClassSession[]>(this.CLASS_SESSIONS_URL);
  }

  getClassSessionsByClassSeriesId(classSeriesId): Observable<ClassSession[]> {
    return this.http.get<ClassSession[]>(this.CLASS_SESSIONS_URL + `/by-series/${classSeriesId}`);
  }

  getUnfinishedClassSessionsByClassSeriesId(classSeriesId): Observable<ClassSession[]> {
    return this.http.get<ClassSession[]>(this.CLASS_SESSIONS_URL + `/by-series/unfinished/${classSeriesId}`);
  }

  getClassSessionsById(id: number): Observable<ClassSession> {
    return this.http.get<ClassSession>(this.CLASS_SESSIONS_URL + '/' + id);
  }

  postNewClassSession(classSession: ClassSession): Observable<ClassSession> {
    return this.http.post<ClassSession>(this.CLASS_SESSIONS_URL, classSession);
  }

  deleteClassSession(id: number): any {
    return this.http.delete(this.CLASS_SESSION_URL + '/' + id);
  }

  putClassSession(classSession: ClassSession): Observable<ClassSession> {
    return this.http.put<ClassSession>(this.CLASS_SESSIONS_URL + '/' + classSession.id, classSession);
  }

  finishClassSessionsById(id: number): Observable<ClassSession> {
    return this.http.get<ClassSession>(this.CLASS_SESSIONS_URL + '/finish/' + id);
  }

  getClassSessionsByClassSeriesIdAndDate(classSeriesId: number, date: Date) {
    const params: HttpParams = new HttpParams().set('date', date.toString());
    return this.http.get<ClassSession[]>(this.CLASS_SESSIONS_URL + `/by-series/unfinished/${classSeriesId}`,
      {params: params});
  }
}
