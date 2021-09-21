import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  jwt: string = ""

  setJwt(authObject: any) {
    this.jwt = authObject.jwt
  }

}
