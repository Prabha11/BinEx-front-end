import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CoreUrlService} from '../url-service/core-url.service';
import {Payment} from '../../model/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentApiService {

  PAYMENT_URL = `${this.coreUrlService.BASE_URL}/payment`;
  PAYMENTS_URL = `${this.coreUrlService.BASE_URL}/payments`;

  constructor(private coreUrlService: CoreUrlService, private  http: HttpClient) { }

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.PAYMENTS_URL);
  }

  getPaymentsById(id: number): Observable<Payment> {
    return this.http.get<Payment>(this.PAYMENTS_URL + '/' + id);
  }

  postNewPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.PAYMENTS_URL, payment);
  }

  deletePayment(id: number): any {
    return this.http.delete(this.PAYMENT_URL + '/' + id);
  }

  putPayment(payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(this.PAYMENTS_URL + '/' + payment.id, payment);
  }
}
