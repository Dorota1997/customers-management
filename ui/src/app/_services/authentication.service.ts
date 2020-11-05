import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { Token } from '../_models/token.model';
import { Login } from '../_models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authenticationUrl = `${environment.api}auth/login`;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {}

  login(authData: Login) {
    return this.http.post(this.authenticationUrl, authData).pipe(
      map((response: Token) => {
        this.tokenStorageService.saveToken(response.access_token);
      }),
    );
  }
}
