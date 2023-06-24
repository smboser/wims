import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  timer,
} from 'rxjs';
import { share } from 'rxjs/operators';
import { Token, User } from '../../interfaces';
import { BaseToken } from './token';
import { TokenFactory } from './token-factory.service';
import { LocalStorageService } from '../../../shared';
import { currentTimestamp, filterObject } from './helpers';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private key = 'courier-token';

  private change$ = new BehaviorSubject<BaseToken | undefined>(undefined);
  private refresh$ = new Subject<BaseToken | undefined>();
  private timer$?: Subscription;
  public user$ = new BehaviorSubject<User>({});

  private _token?: BaseToken;

  constructor(
    private store: LocalStorageService,
    private factory: TokenFactory
  ) {}

  private get token(): BaseToken | undefined {
    if (!this._token) {
      //this._token = this.factory.create(this.store.get(this.key));
      this._token = this.store.get(this.key);
    }
    return this._token;
  }

  change(): Observable<BaseToken | undefined> {
    return this.change$.pipe(share());
  }

  refresh(): Observable<BaseToken | undefined> {
    this.buildRefresh();

    return this.refresh$.pipe(share());
  }

  set(token?: Token): TokenService {
    this.save(token);

    return this;
  }

  clear(): void {
    this.save();
  }

  valid(): boolean {
    // console.log(typeof (this.token as any).token);
    if (typeof (this.token as any).token === 'undefined') return false;
    else {
      const decodedToken: any = jwtDecode((this.token as any).token);
      if (
        decodedToken &&
        decodedToken.exp &&
        decodedToken.exp * 1000 > Date.now()
      ) {
        const { id, usertype, fname, lname, email } = decodedToken;
        this.user$.next({ id, usertype, fname, lname, email });
        return true;
      }
      return false;
    }
  }

  getBearerToken(): string {
    console.log('this.token', this.token);
    return this.token?.token ?? '';
  }

  getRefreshToken(): string | void {
    return this.token?.refresh_token;
  }

  ngOnDestroy(): void {
    this.clearRefresh();
  }

  private save(token?: Token): void {
    this._token = undefined;

    if (!token) {
      this.store.remove(this.key);
    } else {
      const value = Object.assign({
        access_token: '',
        token: token,
      });
      console.log(value);
      this.store.set(this.key, filterObject(value));
    }

    this.change$.next(this.token);
    //this.buildRefresh();
  }

  private buildRefresh() {
    this.clearRefresh();

    // if (this.token?.needRefresh()) {
    //   this.timer$ = timer(this.token.getRefreshTime() * 1000).subscribe(() => {
    //     this.refresh$.next(this.token);
    //   });
    // }
  }

  private clearRefresh() {
    if (this.timer$ && !this.timer$.closed) {
      this.timer$.unsubscribe();
    }
  }
}
