import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Curriculum } from '../curriculum';
import { CurriculumAdapter } from '../curriculum';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  calendarEvents =  [
    {
      title: "Data Persistence",
      date: "2021-09-16"
    },
    {
      title: "Spring Boot",
      date: "2021-09-16"
    },
    {
      title: "Test",
      date: "2021-09-16"
    },
    {
      title: "Test",
      date: "2021-09-16"
    },
    {
      title: "Test",
      date: "2021-09-07"
    },
    {
      title: "Test",
      date: "2021-09-07"
    },
    {
      title: "Test",
      date: "2021-09-07"
    },
    {
      title: "Test",
      date: "2021-09-01"
    },
    {
      title: "Test",
      date: "2021-09-01"
    },
    {
      title: "Test",
      date: "2021-09-01"
    },
    {
      title: "Test",
      date: "2021-09-23"
    },
    {
      title: "Test",
      date: "2021-09-23"
    },
    {
      title: "Test",
      date: "2021-09-23"
    },
    {
      title: "Test",
      date: "2021-09-30"
    },
    {
      title: "Test",
      date: "2021-09-30"
    },
    {
      title: "Test",
      date: "2021-09-30"
    },
    {
      title: "Test",
      date: "2021-08-31"
    },
  ]

  topics = [
    {
      title: "Spring Boot",
      tech_category: {id: 1, name: "Java"},
    },
    {
      title: "Topic 2",
      tech_category: {id: 1, name: "Docker"},
    },
    {
      title: "Topic 3",
      tech_category: {id: 1, name: "AWS"},
    },
    {
      title: "Topic 4",
      tech_category: {id: 1, name: "SQL"},
    },

  ]

  
  constructor(private authService: AuthorizationService, private http: HttpClient, private curriculumAdapter: CurriculumAdapter) { }

  url: string = `${environment.revAssureBase}curriculum`;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": ""
    })
  };

  curriculums: Curriculum[];

  getEvents() {
    return this.calendarEvents;
  }

  getTopics() {
    return this.topics;
  }


  createCurriculum(newTitle: string){
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    this.http.post<Curriculum>(this.url, {
      name: newTitle,
      associates: []  
    }, this.httpOptions)

  }

  addEvent(event: any) {
    console.log(this.authService.jwt)
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.post(`${environment.revAssureBase}event`, event, this.httpOptions)
  }

  getCurriculum(): Observable<Curriculum[]>{
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
      return this.http.get<any[]>(this.url, this.httpOptions)
  }
 
}

// topic_id: number;
// trainer_id: number;
// titie: string;
// description: string;
// estimated_duration: number;
// tech_category_id: number;
// lecture_notes: string;
// github_repo_link: string;