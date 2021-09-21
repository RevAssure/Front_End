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

  registerNewUser(newUser: User): Observable<User> {
    return this.http.post<User>("http://localhost:8081/revuser/register", newUser)
    
  }

  login(username: string, password: string): Observable<Jwt> {
    const authObject = {
      username,
      password
    }
    return this.http.post<Jwt>("http://localhost:8081/revuser/authenticate", authObject);
  }
}
