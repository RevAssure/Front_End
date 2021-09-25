/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Module } from '../module';
import { TechnologyCategory } from '../technologycategory';
import { User } from '../user';
import { ModuleService } from './module.service';

describe('Service: Module', () => {
  let service: ModuleService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const dummyModules : Module[] = [
    new Module(
      1,
      'TDD',
      "it's jank",
      new User(
        1, 'username', 'firstName', 'lastName', true, [], [], [], []
      ),
      new TechnologyCategory(1, 'Java', [], []),
      []
  ),
    new Module(
      2,
      'Java',
      "it's also jank",
      new User(
        1, 'username', 'firstName', 'lastName', true, [], [], [], []
      ),
      new TechnologyCategory(1, 'Java', [], []),
      []

    )
  ];

  const dummyModuleDto = {
    id: 1,
    name: 'TDD',
    description: "it's jank",
    technologyCategory: 1
  }

  const mockJwt : string = 'ThisIsAJwt';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModuleService]
    });
    injector = getTestBed();
    service = injector.inject(ModuleService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //GET All
  it('should get JSON array of all Modules owned by logged in user for GET', () => {
    service.getAllModules(mockJwt).subscribe((result : Module[]) => {
      expect(result[0]).toEqual(dummyModules[0]);
      expect(result[1]).toEqual(dummyModules[1]);
    });
    const mockRequest = httpMock.expectOne(`${environment.revAssureBase}module`);
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(dummyModules);
  });

  //POST
  it('should get a JSON object of the submitted Module when performing POST', () => {
    service.createModule(mockJwt, dummyModuleDto).subscribe((result : Module) => {
      expect(result).toEqual(dummyModules[0]);
    });
    const mockRequest = httpMock.expectOne(`${environment.revAssureBase}module`);
    expect(mockRequest.request.method).toBe('POST');
    mockRequest.flush(dummyModules[0]);
  });

});
