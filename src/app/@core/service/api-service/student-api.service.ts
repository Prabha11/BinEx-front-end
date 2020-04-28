import { Injectable } from '@angular/core';
import {CoreUrlService} from '../url-service/core-url.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../model/student';

@Injectable({
  providedIn: 'root',
})
export class StudentApiService {
  STUDENT_URL = `${this.coreUrlService.BASE_URL}/student`;
  STUDENTS_URL = `${this.coreUrlService.BASE_URL}/students`;

  constructor(private coreUrlService: CoreUrlService, private  http: HttpClient) { }

  getAllStudents(params: HttpParams): Observable<Student[]> {
    return this.http.get<Student[]>(this.STUDENTS_URL, {params: params});
  }

  getStudentsById(id: number): Observable<Student> {
    return this.http.get<Student>(this.STUDENTS_URL + '/' + id);
  }

  postNewStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.STUDENTS_URL, student);
  }

  deleteStudent(id: number): any {
    return this.http.delete(this.STUDENT_URL + '/' + id);
  }

  putStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(this.STUDENTS_URL + '/' + student.id, student);
  }

}
