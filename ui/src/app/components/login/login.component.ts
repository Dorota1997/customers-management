import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/_services/shared.service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  formGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private sharedService: SharedService,
  ) {}

  ngOnInit() {}

  checkError(data: FormGroup, controlName: string, errorName: string) {
    return this.sharedService.checkError(data, controlName, errorName);
  }

  login() {
    const authData = {
      login: this.formGroup.get('login').value,
      password: this.formGroup.get('password').value,
    };

    this.authenticationService
      .login(authData)
      .subscribe(() => this.router.navigate(['/customers']));
  }
}
