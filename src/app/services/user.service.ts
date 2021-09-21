import { Injectable } from '@angular/core';
import { User } from '../user';
import { Jwt } from '../jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Sends a POST request to "/revuser/register" to register a new user
   * @param newUser User object containing Username, Password, First Name and Last Name of user to be registered
   * @returns Observable of persisted User object if successful.
   */
  registerNewUser(newUser: User): Observable<User> {
    return this.http.post<User>("http://localhost:8081/revuser/register", newUser)
    
  }

  /**
   * Sends a POST request to "revuser/authenticate" to attempt to login.
   * @param username Username of user
   * @param password Password of user
   * @returns Observable of an object containing the JWT if successful.
   */
  login(username: string, password: string): Observable<Jwt> {
    const authObject = {
      username,
      password
    }
    return this.http.post<Jwt>("http://localhost:8081/revuser/authenticate", authObject);
  }
}
