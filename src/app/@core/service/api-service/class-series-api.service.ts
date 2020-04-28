import {Injectable} from '@angular/core';
import {CoreUrlService} from '../url-service/core-url.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClassSeries} from '../../model/class-series';

@Injectable({
  providedIn: 'root',
})
export class ClassSeriesApiService {
  CLASS_SERIES_URL = `${this.coreUrlService.BASE_URL}/class-series`;

  constructor(private coreUrlService: CoreUrlService, private  http: HttpClient) {
  }

  getAllClassSeries(): Observable<ClassSeries[]> {
    return this.http.get<ClassSeries[]>(this.CLASS_SERIES_URL);
  }

  getActiveClassSeries(): Observable<ClassSeries[]> {
    return this.http.get<ClassSeries[]>(this.CLASS_SERIES_URL + '/active');
  }

  getClassSeriesById(id: number): Observable<ClassSeries> {
    return this.http.get<ClassSeries>(this.CLASS_SERIES_URL + '/' + id);
  }

  postNewClassSeries(classSeries: ClassSeries): Observable<ClassSeries> {
    return this.http.post<ClassSeries>(this.CLASS_SERIES_URL, classSeries);
  }

  deleteClassSeries(id: number): any {
    return this.http.delete(this.CLASS_SERIES_URL + '/' + id);
  }

  putClassSeries(classSeries: ClassSeries): Observable<ClassSeries> {
    return this.http.put<ClassSeries>(this.CLASS_SERIES_URL + '/' + classSeries.id, classSeries);
  }

  deactivateClassSeriesById(id: number): Observable<ClassSeries> {
    return this.http.get<ClassSeries>(this.CLASS_SERIES_URL + '/deactivate/' + id);
  }
}
