import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Topic } from '../topic';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(private http: HttpClient, private userService: UserService) { }

  url: string = `${environment.revAssureBase}topic`;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": ""
    })
  };

  convertToDto(topic: Topic) {
    let dto = {
      id: topic.id,
      title: topic.title,
      description: topic.description,
      estimatedDuration: topic.estimatedDuration,
      lectureNotes: topic.lectureNotes,
      githubRepo: topic.githubRepo,
      trainer: this.userService.getUserId(),
      technologyCategory: topic.technologyCategory.id,
      modules: [0]
    }
    dto.modules.pop();
    for (let module of topic.modules) {
      dto.modules.push(module.id);
    }
    return dto;
  }

  /**
   * Performs a POST to "/topic" to create a new topic. Passes a topic DTO as required by the
   * back-end API point.
   * @param jwt - JWT for authorization
   * @param topic - new Topic to be persisted
   * @returns an Observable containing the newly persisted Topic
   */
  createTopic(jwt: string, topic: Topic): Observable<Topic> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    const dto = this.convertToDto(topic);
    console.log(dto);
    return this.http.post<Topic>(this.url, dto, this.httpOptions);
  }

  /**
   * Performs a POST to "/topic" to create a new topic. Passes a topic DTO as required by the
   * back-end API point.
   * @param jwt - JWT for authorization
   * @param topic - DTO for persisting a new topic 
   * @returns an Observable containing the newly persisted Topic
   */
   createTopicWithDto(jwt: string, topicDto: any): Observable<Topic> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    console.log("Submitted Topic: " + topicDto);
    return this.http.post<Topic>(this.url, topicDto, this.httpOptions);
  }

  /**
   * Performs a GET to "/topic" to get all topics if a trainer is logged in.
   * @param jwt - JWT for authorization
   * @returns an Observable containing an array of the trainer's topics.
   */
  getTopicById(jwt: string, id: number): Observable<Topic> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.get<Topic>(`${this.url}/${id}`, this.httpOptions);
  }

  getAllTopicsByTrainer(jwt: string): Observable<Topic[]> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.get<Topic[]>(this.url, this.httpOptions);
  }

  getAllTopics(jwt: string): Observable<Topic[]> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.get<Topic[]>(`${this.url}/all`, this.httpOptions);
  }

  updateTopic(jwt: string, topic: Topic): Observable<Topic> {
    const dto = this.convertToDto(topic);
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.put<Topic>(this.url, dto, this.httpOptions);
  }

  deleteTopicById(jwt: string, id: number): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  }
}
