import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { CustomerService } from './customer.service';

describe('Service: Customer', () => {
  let httpMock: HttpTestingController;
  let customerService: CustomerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService],
      imports: [HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    customerService = TestBed.get(CustomerService);
  });

  it('should use GET method', () => {
    customerService.customers().subscribe();
    const request = httpMock.expectOne(`${environment.api}customers`);
    expect(request.request.method).toBe('GET');
  });

  it('should use the right url', () => {
    customerService.customers().subscribe();
    const request = httpMock.expectOne(`${environment.api}customers`);
    expect(request.request.url).toBe(`${environment.api}customers`);
  });

  it('should return the right data', () => {
    const customersArray = [
      {
        id: 6,
        name: 'Arkadiusz',
        surname: 'Szczepański',
        birthDate: '13.07.1970',
        industry: 'Podróże',
        subcategory: 'Zagraniczne',
        phoneNumber: '900188354',
        email: 'szczepanskiArkadiusz@onet.pl',
      },
    ];

    customerService.customers().subscribe((customers) => {
      expect(customers).toEqual(customersArray);
    });

    const request = httpMock.expectOne(`${environment.api}customers`);
    request.flush(customersArray);
  });

  it('should use POST method', () => {
    const customer = {
      name: 'Janina',
      surname: 'Kowalska',
      birthDate: '15.07.1990',
      industry: 'Finanse',
      subcategory: 'Ubezpieczalnia',
      phoneNumber: '901672003',
      email: 'janinaKowalska@gmail.com',
    };
    customerService.create(customer).subscribe();
    const request = httpMock.expectOne(`${environment.api}customers`);
    expect(request.request.method).toBe('POST');
    expect(request.request.url).toBe(`${environment.api}customers`);
    request.flush(customer);
  });

  it('should use PUT method', () => {
    const customer = {
      id: 3,
      name: 'Katarzyna',
      surname: 'Wrona',
      birthDate: '09.10.1977',
      industry: 'Media',
      subcategory: 'TV',
      phoneNumber: '606198234',
      email: 'wronaKatarzyna@wp.pl',
    };
    customerService.update(customer).subscribe();
    const request = httpMock.expectOne(`${environment.api}customers/${customer.id}`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.url).toBe(`${environment.api}customers/${customer.id}`);
    request.flush(customer);
  });
});
