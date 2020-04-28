import { Injectable } from '@angular/core';
import {CoreUrlService} from '../url-service/core-url.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Attendance} from '../../model/attendance';

@Injectable({
  providedIn: 'root',
})
export class AttendanceApiService {

  ATTENDANCE_URL = `${this.coreUrlService.BASE_URL}/attendance`;
  ATTENDANCES_URL = `${this.coreUrlService.BASE_URL}/attendances`;

  constructor(private coreUrlService: CoreUrlService, private  http: HttpClient) { }

  getAllAttendances(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.ATTENDANCES_URL);
  }

  getAttendancesById(id: number): Observable<Attendance> {
    return this.http.get<Attendance>(this.ATTENDANCES_URL + '/' + id);
  }

  postNewAttendance(attendance: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(this.ATTENDANCES_URL, attendance);
  }

  deleteAttendance(id: number): any {
    return this.http.delete(this.ATTENDANCE_URL + '/' + id);
  }

  putAttendance(attendance: Attendance): Observable<Attendance> {
    return this.http.put<Attendance>(this.ATTENDANCES_URL + '/' + attendance.id, attendance);
  }

}
