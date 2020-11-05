import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Industry } from '../_models/industry.model';

@Injectable({
  providedIn: 'root',
})
export class IndustryService {
  baseUrl = `${environment.api}industries`;
  constructor(private http: HttpClient) {}

  industries(): Observable<Industry[]> {
    return this.http.get<Industry[]>(this.baseUrl);
  }
}
