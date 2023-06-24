import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  constructor(protected http: HttpClient, private router: Router) {}

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

  getUserDetails(detailData: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiServer}${environment.apiUrl}/admin/adminUserById`,
        detailData
      )
      .pipe(tap((data) => console.log(data)));
  }
}
