import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CurriculumService } from './curriculum.service';
import { environment } from 'src/environments/environment.prod';
import { Curriculum } from '../curriculum';

describe('CurriculumService', () => {
  let service: CurriculumService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    injector = getTestBed();
    service = TestBed.inject(CurriculumService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of curriculums with current user logged in', () => {
    let curriculums: Curriculum[] = [];
    service.getCurriculum(true).subscribe((result) => {
      expect(result).toBe(curriculums);
    })

    const request = httpMock.expectOne(`${environment.revAssureBase}curriculum`);
    expect(request.request.method).toBe('GET');
    request.flush(curriculums);

  })

  afterEach(() => {
    httpMock.verify();
  })
});
