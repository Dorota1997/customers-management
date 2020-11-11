import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxMaskModule } from 'ngx-mask';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { JwtModule } from '@auth0/angular-jwt';
import { MatExpansionModule } from '@angular/material/expansion';
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
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot(),
    MatSortModule,
    MatSelectModule,
    JwtModule.forRoot({ config: {} }),
    MatExpansionModule,
  ],
  providers: [AuthenticationService, authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
