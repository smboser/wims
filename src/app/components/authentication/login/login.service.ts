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
    console.log(loginData);
    return this.http
      .post<any>(
        `${environment.apiServer}${environment.apiUrl}/signin`,
        loginData
      )
      .pipe(
        tap((data) => {
          console.log('data', data);
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
}
