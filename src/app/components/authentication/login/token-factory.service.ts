import { Injectable } from '@angular/core';
import { Token } from '../../interfaces';
import { SimpleToken, JwtToken, BaseToken } from './token';

@Injectable({
  providedIn: 'root',
})
export class TokenFactory {
  create(attributes: Token): BaseToken | undefined {
    if (!attributes.access_token) {
      return undefined;
    }

    if (JwtToken.is(attributes.access_token)) {
      return new JwtToken(attributes);
    }

    return new SimpleToken(attributes);
  }
}
