import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { IndustryService } from './industry.service';

describe('Service: Industry', () => {
  let httpMock: HttpTestingController;
  let industryService: IndustryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndustryService],
      imports: [HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
    industryService = TestBed.get(IndustryService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should use GET method', () => {
    industryService.industries().subscribe();
    const request = httpMock.expectOne(`${environment.api}industries`);
    expect(request.request.method).toBe('GET');
  });

  it('should use the right url', () => {
    industryService.industries().subscribe();
    const request = httpMock.expectOne(`${environment.api}industries`);
    expect(request.request.url).toBe(`${environment.api}industries`);
  });

  it('should return the right data', () => {
    const industriesArray = [
      {
        name: 'Finanse',
        subcategories: ['Bank', 'Ubezpieczalnia'],
      },
    ];

    industryService.industries().subscribe((industries) => {
      expect(industries).toEqual(industriesArray);
    });

    const request = httpMock.expectOne(`${environment.api}industries`);
    request.flush(industriesArray);
  });
});
