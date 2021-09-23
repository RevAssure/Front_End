/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TechnologyCategory } from '../technologycategory';
import { Topic } from '../topic';
import { User } from '../user';
import { TopicService } from './topic.service';

fdescribe('Service: Topic', () => {
  let service: TopicService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const dummyTopics : Topic[] = [
    new Topic(
        1,
        'title',
        'Description',
        60,
        'Lorum ipsum',
        'http://www.github.com',
        new User(
          1, 'username', 'firstName', 'lastName', true, [], [], [], []
        ),
        new TechnologyCategory(1, 'Java', [], []),
        []
    ),
    new Topic(
      2,
      'title',
      'Description',
      60,
      'Lorum ipsum',
      'http://www.github.com',
      new User(
        1, 'username', 'firstName', 'lastName', true, [], [], [], []
      ),
      new TechnologyCategory(1, 'Java', [], []),
      []
    )
  ];

  const dummyTopicDto = {
    title: dummyTopics[0].title,
    description: dummyTopics[0].description,
    estimatedDuration: dummyTopics[0].estimatedDuration,
    lectureNotes: dummyTopics[0].lectureNotes,
    githubRepo: dummyTopics[0].githubRepo,
    trainer: dummyTopics[0].trainer.id,
    technologyCategory: dummyTopics[0].technologyCategory.id,
    modules: []
  }

  const mockJwt : string = 'ThisIsAJwt';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TopicService]
    });
    injector = getTestBed();
    service = injector.inject(TopicService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get JSON array of all topics owned by logged in user for GET', () => {
    service.getAllTopicsForCurrentTrainer(mockJwt).subscribe((result : Topic[]) => {
      expect(result[0]).toEqual(dummyTopics[0]);
      expect(result[1]).toEqual(dummyTopics[1]);
    });
    const mockRequest = httpMock.expectOne(`${environment.revAssureBase}topic`);
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(dummyTopics);
  });

  //POST test
  it('should return a JSON of persisted topic when doing POST', () => {
    service.createTopic(mockJwt, dummyTopicDto).subscribe((result : Topic) => {
      expect(result).toEqual(dummyTopics[0]);
    })
    const mockRequest = httpMock.expectOne(`${environment.revAssureBase}topic`);
    expect(mockRequest.request.method).toBe('POST');
    mockRequest.flush(dummyTopics[0]);
  });
});
