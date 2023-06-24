import { Component } from '@angular/core';
import { TokenService } from '../authentication/login/token.service';
import { Subscription, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  subscriptions: Subscription[] = [];

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit() {
    this.subscriptions.push(
      this.tokenService.user$.pipe(take(1)).subscribe((res) => {
        if (res?.usertype === 'admin') {
          this.router.navigate(['/admin/dashboard']);
          console.log(res?.usertype);
          return;
        } else if (res?.usertype === 'stockist') {
          this.router.navigate(['/stockist/dashboard']);
          //this.tokenService.user$.unsubscribe();
          console.log(res?.usertype);
          return;
        }
      })
    );
  }

  ngOnDestroy(): void {
    console.log('on destroy');
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }
}
