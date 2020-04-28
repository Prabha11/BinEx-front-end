import { Injectable } from '@angular/core';
import {CoreUrlService} from '../url-service/core-url.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Enrollment} from '../../model/enrollment';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentApiService {
  ENROLLMENT_URL = `${this.coreUrlService.BASE_URL}/enrollment`;
  ENROLLMENTS_URL = `${this.coreUrlService.BASE_URL}/enrollments`;

  constructor(private coreUrlService: CoreUrlService, private  http: HttpClient) { }

  getAllEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.ENROLLMENTS_URL);
  }

  getEnrollmentsById(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(this.ENROLLMENTS_URL + '/' + id);
  }

  postNewEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.ENROLLMENTS_URL, enrollment);
  }

  deleteEnrollment(id: number): any {
    return this.http.delete(this.ENROLLMENT_URL + '/' + id);
  }

  putEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(this.ENROLLMENTS_URL + '/' + enrollment.id, enrollment);
  }

}
