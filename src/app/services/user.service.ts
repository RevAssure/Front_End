import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerNewUser(newUser: User) {
    return this.http.post("http://localhost:8081/revuser/register", newUser)
  }

  login(username: string, password: string) {
    const authObject = {
      username,
      password
    }
    return this.http.post("http://localhost:8081/revuser/authenticate", authObject)
  }
}
