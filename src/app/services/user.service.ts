import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { UserAdapter } from '../user';
import { Topic } from '../topic';
import { Curriculum } from '../curriculum';
import { Module } from '../module';

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
  registerNewUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, newUser).pipe(map((result: any) => {
      let registeredUser: User = this.userAdapter.adapt(result);
      return registeredUser;
    }));
  }

  /**
   * Performs a POST to "/revuser/authenticate" to login.
   * After successful login, also calls getUser().
   * @param username 
   * @param password 
   * @returns Observable of the user's JWT as a string.
   */
  login(username: string, password: string): Observable<any> {
    const authObject = {
      username,
      password
    }
    return this.http.post(`${this.url}/authenticate`, authObject).pipe(
      switchMap((jwt:any) => {
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
    return this.http.get(`${this.url}`, this.httpOptions).pipe(map((result: any) => {
      this.user = this.userAdapter.adapt(result);
      return jwtObject;
    }));
  }

  /**
   * Getters for the User object kept by UserService.
   */
  getUserObject() : User {
    return this.user;
  }
  getUserId() : number {
    return this.user?.id;
  }
  getUsername(): string {
    return this.user?.username;
  }
  getFirstName(): string {
    return this.user?.firstName;
  }
  getLastName(): string {
    return this.user?.lastName;
  }
  isTrainer(): boolean {
    return this.user?.trainer;
  }
  getTopics(): Topic[] {
    return this.user?.topics;
  }
  getCurricula(): Curriculum[] {
    return this.user?.curricula;
  }
  getOwnedCurricula(): Curriculum[] {
    return this.user?.ownedCurricula;
  }
  getModules(): Module[] {
    return this.user?.modules;
  }
}
