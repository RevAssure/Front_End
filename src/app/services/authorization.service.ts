import { Injectable } from '@angular/core';

/**
 * The AuthorizationService is used to store a logged in user's JSON Web Token (JWT).
 * The JWT is set upon login and is used to authorize all future requests. 
 * Inject AuthorizationService into other services through their constructors to make
 * valid web requests to the back-end.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  /**
   * String property that can be accessed to get the JWT for current user.
   */
  jwt: string = "";

  /**
   * Sets the JWT to be stored in the front-end. This token is needed for all
   * requests besides user registration and login.
   * @param authObject - JSON object containing the JWT
   */
  setJwt(authObject: any) {
    this.jwt = authObject.jwt
  }

}
