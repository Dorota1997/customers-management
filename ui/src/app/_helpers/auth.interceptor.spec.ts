import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AuthInterceptor, authInterceptorProviders } from './auth.interceptor';
import { CustomerService } from '../_services/customer.service';

describe('AuthInterceptor', () => {
  let customerService: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthInterceptor, authInterceptorProviders, CustomerService],
    });

    customerService = TestBed.get(CustomerService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    customerService.customers().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`${environment.api}customers`);
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
  });
});
