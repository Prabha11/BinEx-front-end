import { Injectable } from '@angular/core';
import {CoreUrlService} from '../url-service/core-url.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {School} from '../../model/school';

@Injectable({
  providedIn: 'root',
})
export class SchoolApiService {
  SCHOOL_URL = `${this.coreUrlService.BASE_URL}/school`;
  SCHOOLS_URL = `${this.coreUrlService.BASE_URL}/schools`;

  constructor(private coreUrlService: CoreUrlService, private  http: HttpClient) { }

  getAllSchools(): Observable<School[]> {
    return this.http.get<School[]>(this.SCHOOLS_URL);
  }

  getSchoolsById(id: number): Observable<School> {
    return this.http.get<School>(this.SCHOOLS_URL + '/' + id);
  }

  postNewSchool(school: School): Observable<School> {
    return this.http.post<School>(this.SCHOOLS_URL, school);
  }

  deleteSchool(id: number): any {
    return this.http.delete(this.SCHOOL_URL + '/' + id);
  }

  putSchool(school: School): Observable<School> {
    return this.http.put<School>(this.SCHOOLS_URL + '/' + school.id, school);
  }

}
