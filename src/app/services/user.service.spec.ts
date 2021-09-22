import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from '../user';
import { Jwt } from '../jwt';
import { HttpHeaders } from '@angular/common/http';

fdescribe('UserService', () => {
  let service: UserService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    injector = getTestBed();
    service = injector.inject(UserService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getFirstName() should return an Observable updatable via setFirstName()', async() => {
    const expectedName: string = "Test";
    service.getFirstName().subscribe(name => expect(name).toBe(expectedName));
    service.setFirstName(expectedName);
  });

  it('getLastName() should return an Observable updatable via setLastName()', async() => {
    const expectedName: string = "Test";
    service.getLastName().subscribe(name => expect(name).toBe(expectedName));
    service.setLastName(expectedName);
  });

  it('should return a JSON of User when registerNewUser() is called', () => {
    const dummyUserOutput: User = {
      id: 0,
      firstName: "Test",
      lastName: "McGee",
      username: "test",
      trainer: false
    }

    let dummyUserInput: User & {password?: string}= dummyUserOutput;
    dummyUserInput.password = "test123";

    service.registerNewUser(dummyUserInput).subscribe((user) => {
      expect(user.id).toEqual(dummyUserOutput.id);
      expect(user.username).toEqual(dummyUserOutput.username);
    });
    const request = httpMock.expectOne("http://54.237.215.131:8082/revuser/register");
    expect(request.request.method).toBe('POST');
    request.flush(dummyUserOutput);
  });

  it('should return a JSON with a jwt when login() is called', () => {
    const dummyJwt: Jwt = {
      jwt: "thisIsAJwt"
    }
    const dummyUsername: string = "test";
    const dummyPassword: string = "password";

    service.login(dummyUsername, dummyPassword).subscribe((jwt) => {
      expect(jwt.jwt).toEqual(dummyJwt.jwt);
    });
    const request = httpMock.expectOne("http://54.237.215.131:8082/revuser/authenticate");
    expect(request.request.method).toBe('POST');
    request.flush(dummyJwt);
  });

  it('should set new firstName/lastName when getFullName() called', async() => {
    const mockJwt = "mock jwt";
    const mockHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': "application/json",
        'Authorization': mockJwt
      })
    }
    const dummyFirstName: string = "Test1";
    const dummyLastName: string = "Test2";
    const dummyUserOutput: User = {
      id: 0,
      firstName: dummyFirstName,
      lastName: dummyLastName,
      username: "test",
      trainer: false
    }

    service.getFirstName().subscribe(name => expect(name).toBe(dummyFirstName));
    service.getLastName().subscribe(name => expect(name).toBe(dummyLastName));
    service.getFullName(mockJwt);
    const request = httpMock.expectOne("http://54.237.215.131:8082/revuser");
    expect(request.request.method).toBe('GET');
    request.flush(dummyUserOutput);
  });

  afterEach(() => {
    httpMock.verify();
  });
});