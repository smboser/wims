import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { User } from '../../interfaces';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    protected http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiServer}${environment.apiUrl}/signin`,
        loginData
      )
      .pipe(
        tap((data) => {
          if (data && data.status && data.status === 'success') {
            let token = data.response?.token;
            this.tokenService.set(token);
            // const { id, usertype, fname, lname, email } = data.response;
            // this.user$.next({ id, usertype, fname, lname, email });
            // this.router.navigate(['/']);
            // Checking token
          }
        })
      );
  }

  register(registerData: User): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiServer}${environment.apiUrl}/signup`,
        registerData
      )
      .pipe(tap((data) => console.log(data)));
  }

  getCountries(): Observable<any> {
    return this.http.get('assets/countries.json');
  }

  getStates(): Observable<any> {
    // Fetch country.json
    return this.http.get('assets/states.json');
  }
}
