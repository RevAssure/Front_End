import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from '../user';
import { Jwt } from '../jwt';

describe('CurriculumService', () => {
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
    const request = httpMock.expectOne("http://localhost:8081/revuser/register");
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
    const request = httpMock.expectOne("http://localhost:8081/revuser/authenticate");
    expect(request.request.method).toBe('POST');
    request.flush(dummyJwt);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
