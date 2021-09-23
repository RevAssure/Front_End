import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { UserAdapter } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private userAdapter: UserAdapter) { }

  url: string = `${environment.revAssureBase}revuser`;

  private user: User;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": ""
    })
  };

  /**
   * Performs a POST to "/revuser/register" to register a new user to database.
   * @param newUser User to be registered and persisted.
   * @returns Observable of User returned from backend.
   */
  // TODO: What should happen after registerNewUser() gets an OK response? 
  // Should the user be logged in? Should UserService also handle that (including giving JWT to AuthService)?
  registerNewUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, newUser).pipe(map((result: any) => {
      let registeredUser: User = this.userAdapter.adapt(result);
      console.log(registeredUser);
      return registeredUser;
    }));
  }

  /**
   * Performs a POST to "/revuser/authenticate" to login.
   * Doesn't 
   * @param username 
   * @param password 
   * @returns Observable of the user's JWT as a string.
   */
  login(username: string, password: string): Observable<any> {
    const authObject = {
      username,
      password
    }
    console.log(`${this.url}/authenticate`);
    return this.http.post(`${this.url}/authenticate`, authObject).pipe(
      switchMap((jwt:any) => {
        console.log(`Now about to call getUser() with jwt: ${jwt}`);
        return this.getUser(jwt)
      })
    );
  }

  /**
   * Performs a GET to "/revuser" to fetch the User object for the user currently logged in and keeps it in this service.
   * Currently only subscribed to by UserService upon successful login().
   * @param jwt (Object) JSON object containing the property 'jwt' which holds the JWT.
   * @returns Object containing JWT is passed back.
   */
  private getUser(jwtObject: any & {jwt: string}) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${jwtObject.jwt}`);
    console.log(this.httpOptions)
    return this.http.get(`${this.url}`, this.httpOptions).pipe(map((result: any) => {
      this.user = this.userAdapter.adapt(result);
      console.log(this.user);
      return jwtObject;
    }));
  }

  /**
   * Getters for the User object kept by UserService.
   */
  getUsername() {
    return this.user?.username;
  }
  getFirstName() {
    return this.user?.firstName;
  }
  getLastName() {
    return this.user?.lastName;
  }
  isTrainer() {
    return this.user?.trainer;
  }
  getTopics() {
    return this.user?.topics;
  }
  getCurricula() {
    return this.user?.curricula;
  }
  getOwnedCurricula() {
    return this.user?.ownedCurricula;
  }
  getModules() {
    return this.user?.modules;
  }

  // TODO: contemplate putting in setters for topics/curricula/modules/ownedCurricula.
  // Should they simply push/pop to those arrays?
  // Find out whether it's possible to get an array property from a private object via getter than push/pop directly to it.
}
