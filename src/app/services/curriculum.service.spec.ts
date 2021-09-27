import { getTestBed, TestBed } from '@angular/core/testing';
import { Curriculum, CurriculumAdapter } from '../curriculum';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { CurriculumService } from './curriculum.service';
import { User, } from '../user';
import { environment } from '../../environments/environment';
import { Event } from '../event';
import { Topic } from '../topic';
import { TechnologyCategory } from '../technologycategory';


describe('CurriculumService', () => {
  let service: CurriculumService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const dummyUser: User = {
    id: 1,
    firstName: "firstNameTest",
    lastName: "lastNameTest",
    username: "usernameTest",
    trainer: false,
    topics: [],
    curricula: [],
    ownedCurricula: [],
    modules: []
  };

  const dummyTechCategory: TechnologyCategory = {
    id: 0,
    name: "dummyTechCategoryName",
    topics: [],
    modules:[]
  }
  
  const dummyTopic: Topic = {
    id: 0,
    title: "dummyTopicTitle",
    description: "dummyTopicDescription",
    estimatedDuration: 0,
    lectureNotes: "dummyTopicNotes",
    githubRepo: "dummyTopicRepo",
    trainer: dummyUser,
    technologyCategory: dummyTechCategory,
    modules: []
  }

  const dummyCurriculum: Curriculum = {
    id: 1,
    name: 'TestCurriculum',
    trainer: dummyUser,
    events: [],
    users: []
  }

  const dummyEvent: Event = {
    id: 0,
    curriculum: 0,
    startDatetime: 0,
    topic: dummyTopic
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurriculumService]
    });
    injector = getTestBed();
    service = injector.inject(CurriculumService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a Curriculum when createCurriculum() is called', () => {
    service.createCurriculum(dummyCurriculum.name).subscribe((result) => {
      expect(result.id).toEqual(dummyCurriculum.id);
      expect(result.name).toEqual(dummyCurriculum.name);
      expect(result.trainer).toEqual(dummyCurriculum.trainer);
      expect(result.events).toEqual(dummyCurriculum.events);
      expect(result.users).toEqual(dummyCurriculum.users);
    });
    const request = httpMock.expectOne(`${environment.revAssureBase}curriculum`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyCurriculum);
  });

  it('should perform a GET when getCurriculum() is called', () => {
    service.getCurriculum(true).subscribe((result) => {
      expect(result).toEqual([dummyCurriculum])
    });
    const request = httpMock.expectOne(`${environment.revAssureBase}curriculum`);
    expect(request.request.method).toBe('GET');
    request.flush([dummyCurriculum]);
  });
  
  it('should perform a GET when getCurriculumAssociate() is called', () => {
    service.getCurriculumAssociate().subscribe((result) => {
      expect(result).toEqual([dummyCurriculum])
    });
    const request = httpMock.expectOne(`${environment.revAssureBase}curriculum/assigned`);
    expect(request.request.method).toBe('GET');
    request.flush([dummyCurriculum]); 
  });

  it('should perform a DELETE when deleteEventById() is called', () => {
    service.deleteEventById(dummyCurriculum.id).subscribe((result) => {});
    const request = httpMock.expectOne(`${environment.revAssureBase}event/${dummyCurriculum.id}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });

  it('should perform a POST when addEvent() is called', () => {
    service.addEvent(dummyEvent).subscribe((result) => {
      expect(result).toEqual(dummyEvent);
    });
    const request = httpMock.expectOne(`${environment.revAssureBase}event`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyEvent);
  })
  
  afterEach(() => {
    httpMock.verify();
  });
});
