import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User, UserAdapter } from '../user';
import { environment } from '../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const dummyUser: User = {
    id: 1,
    firstName: "Test",
    lastName: "McGee",
    username: "test",
    trainer: false,
    topics: [],
    curricula: [],
    ownedCurricula: [],
    modules: []
  };

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

  it('should return a User when registerNewUser() is called', () => {
    let dummyUserInput: User & {password?: string} = dummyUser;
    dummyUserInput.password = "test123";

    service.registerNewUser(dummyUserInput).subscribe((user) => {
      expect(user.id).toEqual(dummyUser.id);
      expect(user.username).toEqual(dummyUser.username);
    });
    const request = httpMock.expectOne(`${environment.revAssureBase}revuser/register`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyUser);
  });

  it('should return a JSON with a jwt and cache a User object when login() is called', () => {
    const dummyJwt: any = {
      jwt: "thisIsAJwt"
    }
    const dummyUsername: string = dummyUser.username;
    const dummyPassword: string = "password";

    service.login(dummyUsername, dummyPassword).subscribe((jwt: any) => {
      expect(jwt.jwt).toEqual(dummyJwt.jwt);
      expect(service.getFirstName()).toEqual(dummyUser.firstName);
      expect(service.getLastName()).toEqual(dummyUser.lastName);
    });
    const request = httpMock.expectOne(`${environment.revAssureBase}revuser/authenticate`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyJwt);
    const request2 = httpMock.expectOne(`${environment.revAssureBase}revuser`);
    expect(request2.request.method).toBe('GET');
    request2.flush(dummyUser);
  });

  afterEach(() => {
    httpMock.verify();
  });
});