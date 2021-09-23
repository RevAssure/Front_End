/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TechnologyCategory } from '../technologycategory';
import { TechCategoryService } from './tech-category.service';

describe('Service: TechCategory', () => {
  let service: TechCategoryService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TechCategoryService]
    });
    injector = getTestBed();
    service = injector.inject(TechCategoryService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get JSON array of all technology categories', () => {
    const dummyTechCategories : TechnologyCategory[] = [
        new TechnologyCategory(
            1,
            "HDD",
            [],
            []
        ),
        new TechnologyCategory(
            2,        
            "CPU",
            [],
            []
        )
    ];

    const dummyResponse : any[] = [
      {
          "id": 1,
          "name": "HDD"
      },
      {
          "id": 2,        
          "name": "CPU"
      }
   ];
    const mockJwt : string = 'ThisIsAJwt';
    service.getAllCategories(mockJwt).subscribe((result : TechnologyCategory[]) => {
      expect(result[0]).toEqual(dummyTechCategories[0]);
      expect(result[1]).toEqual(dummyTechCategories[1]);
    });
    const mockRequest = httpMock.expectOne(`${environment.revAssureBase}technology_category`);
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(dummyResponse);
  });
});
