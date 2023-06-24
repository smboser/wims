import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  constructor(protected http: HttpClient, private router: Router) {}
  lists() {
    return this.http.get<any>(
      `${environment.apiServer}${environment.apiUrl}/admin/adminUserList`
    );
  }

  getLists() {
    this.lists().subscribe((res) => {
      if (res && res.status === 'success' && res.response) {
        this.userList$.next(res.response);
      }
    });
  }
}
