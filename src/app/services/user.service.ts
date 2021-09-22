import { Injectable } from '@angular/core';
import { User } from '../user';
import { Jwt } from '../jwt';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url: string = "http://54.237.215.131:8082/revuser"

  private firstName: string
  private firstNameChange = new Subject<string>();
  public firstName$ = this.firstNameChange.asObservable();

  private lastName: string;
  private lastNameChange = new Subject<string>();
  public lastName$ = this.lastNameChange.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": ""
    })
  };

    /**
   * Getters for firstName and lastName which return AN OBSERVABLE.
   */
    getFirstName(): Observable<string> {
      return this.firstName$;
    }
    getLastName(): Observable<string> {
      return this.lastName$;
    }
  
    /**
     * Setters for firstName and lastName, includes functionality to push changes to the respective Observable.
     */
    setFirstName(newFirstName: string) {
      this.firstName = newFirstName;
      this.firstNameChange.next(newFirstName);
    }
    setLastName(newLastName: string) {
      this.lastName = newLastName;
      this.lastNameChange.next(newLastName);
    }

  registerNewUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, newUser).pipe(map((result: any) => {
      let registeredUser: User = {
        id: result.id,
        username: result.username,
        firstName: result.firstName,
        lastName: result.lastName,
        trainer: result.trainer
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
    return this.http.post<Jwt>(`${this.url}/authenticate`, authObject);
  }

  getFullName(jwt: string) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${jwt}`);
    console.log(this.httpOptions)
    this.http.get(`${this.url}`, this.httpOptions).subscribe((result: any) => {
      console.log(result);
      this.getFirstName().subscribe(name => console.log(name));
      this.getLastName().subscribe(name => console.log(name));
      this.setFirstName(result.firstName);
      this.setLastName(result.lastName);
    });
  }
}
