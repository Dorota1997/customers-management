import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { inject, TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { LoginComponent } from '../components/login/login.component';

describe('Service: Authentication', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthenticationService],
      imports: [HttpClientTestingModule],
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login correctly', inject(
    [AuthenticationService],
    (authService: AuthenticationService) => {
      const user = {
        login: 'admin',
        password: 'k5o#v0qG@I',
      };
      authService.login(user).subscribe(() => {});
      const request = httpMock.expectOne(`${environment.api}auth/login`);
      expect(request.request.method).toBe('POST');
    },
  ));
});
