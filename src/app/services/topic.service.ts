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

  createTopic(jwt: string, topic: any): Observable<Topic> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.post<Topic>(this.url, topic, this.httpOptions);
  }

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

  updateTopic(jwt: string, topic: any): Observable<Topic> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.put<Topic>(this.url, topic, this.httpOptions);
  }

  deleteTopicById(jwt: string, id: number): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  }
}
