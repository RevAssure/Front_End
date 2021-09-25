import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Topic } from '../topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(private http: HttpClient) { }

  url: string = `${environment.revAssureBase}topic`;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": ""
    })
  };

  /**
   * Performs a POST to "/topic" to create a new topic. Passes a topic DTO as required by the
   * back-end API point.
   * @param jwt - JWT for authorization
   * @param topic - DTO for persisting a new topic 
   * @returns an Observable containing the newly persisted Topic
   */
  createTopic(jwt: string, topic: any): Observable<Topic> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.post<Topic>(this.url, topic, this.httpOptions);
  }

  /**
   * Performs a GET to "/topic" to get all topics if a trainer is logged in.
   * @param jwt 
   * @returns an Observable containing an array of the trainer's topics.
   */
  getAllTopicsForCurrentTrainer(jwt: string): Observable<Topic[]> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.get<Topic[]>(this.url, this.httpOptions);
  }

}
