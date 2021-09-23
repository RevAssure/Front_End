import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url: string = environment.revAssureBase;

  private firstName: string
  private firstNameChange = new Subject<string>();
  public firstName$ = this.firstNameChange.asObservable();

  private lastName: string;
  private lastNameChange = new Subject<string>();
  public lastName$ = this.lastNameChange.asObservable();

  httpOptions: any = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": ""
    })
  };

  registerNewUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, newUser).pipe(map((result: any) => {
      let registeredUser: User = {
        id: result.id,
        username: result.username,
        firstName: result.firstName,
        lastName: result.lastName,
        trainer: result.trainer,
        topics: result.topics,
        curricula: result.curricula,
        modules: result.modules,
        ownedCurricula: result.ownedCurricula
      }
      console.log(registeredUser)
      return registeredUser
    }));
  }

  login(username: string, password: string) {
    const authObject = {
      username,
      password
    }
    return this.http.post(`${this.url}/authenticate`, authObject);
  }

  getFullName(jwt: string) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${jwt}`);
    console.log(this.httpOptions)
    this.http.get(`${this.url}`, this.httpOptions).subscribe((result) => {
      console.log(result)
    });
  }
}
