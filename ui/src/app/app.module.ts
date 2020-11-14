import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { JwtModule } from '@auth0/angular-jwt';
import { MaterialModule } from './material.module';
import { FormComponent } from './components/form/form.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AuthenticationService } from './_services/authentication.service';
import { SearchComponent } from './components/search/search.component';
@NgModule({
  declarations: [AppComponent, LoginComponent, CustomersComponent, FormComponent, SearchComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    JwtModule.forRoot({ config: {} }),
    MaterialModule,
  ],
  providers: [AuthenticationService, authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
