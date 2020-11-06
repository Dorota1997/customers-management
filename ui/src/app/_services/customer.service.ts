import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../_models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseUrl = `${environment.api}customers`;
  constructor(private http: HttpClient) {}

  customers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  create(customer: Customer) {
    return this.http.post(this.baseUrl, customer);
  }

  update(customer: Customer) {
    return this.http.put(`${this.baseUrl}/${customer.id}`, customer);
  }
}
