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

  /**
   * Converts a Topic into a DTO for POST/PUT.
   * @param topic Topic object to be converted.
   * @returns DTO representation of input topic.
   */
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
   * Calls convertToDto() to on input Topic before passing it to request body.
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
   * Same as createTopic() but with different params (can expects a DTO instead of Topic object.)
   * Performs a POST to "/topic" to create a new topic. Passes a topic DTO as required by the
   * back-end API point.
   * DOES NOT call convertToDto().
   * @param jwt - JWT for authorization
   * @param topicDto - DTO for persisting a new topic. Needs to be already compliant with endpoint's requirements!
   * @returns an Observable containing the newly persisted Topic
   */
   createTopicWithDto(jwt: string, topicDto: any): Observable<Topic> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.post<Topic>(this.url, topicDto, this.httpOptions);
  }

  /**
   * Performs a GET to "/topic/{id}" to get the topic with ID {id}.
   * @param jwt - JWT for authorization
   * @param id - (number) ID of desired Topic
   * @returns an Observable that would contain the requested Topic if it exists.
   */
  getTopicById(jwt: string, id: number): Observable<Topic> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.get<Topic>(`${this.url}/${id}`, this.httpOptions);
  }

  /**
   * Performs a GET to "/topic" to get all topics if a trainer is logged in.
   * @param jwt - JWT for authorization
   * @returns an Observable containing an array of the trainer's topics.
   */
  getAllTopicsByTrainer(jwt: string): Observable<Topic[]> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.get<Topic[]>(this.url, this.httpOptions);
  }

  /**
   * Performs a GET to "/topic/all" to get all topics in database (from all trainers).
   * @param jwt - JWT for authorization
   * @returns an Observable containing an array of all topics.
   */
  getAllTopics(jwt: string): Observable<Topic[]> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.get<Topic[]>(`${this.url}/all`, this.httpOptions);
  }

  /**
   * Performs a PUT to "topic" to update the topic passed as input.
   * @param jwt - JWT for authorization
   * @param topic - Topic to be updated.
   * @returns an Observable containing the Topic as it is persisted in database.
   */
  updateTopic(jwt: string, topic: Topic): Observable<Topic> {
    const dto = this.convertToDto(topic);
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.put<Topic>(this.url, dto, this.httpOptions);
  }

    /**
   * Performs a DELETE to "topic/{id}" to delete the topic with ID {id}.
   * @param jwt - JWT for authorization
   * @param id - (number) ID of Topic to be deleted.
   * @returns an Observable that completes when a response is received from endpoint.
   */
  deleteTopicById(jwt: string, id: number): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  }
}
