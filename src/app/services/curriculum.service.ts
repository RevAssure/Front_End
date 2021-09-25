import { Injectable } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Curriculum } from '../curriculum';
import { CurriculumAdapter } from '../curriculum';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Event } from 'src/app/event';
import { UserService } from './user.service';
import { CalendarEvent } from '../calendarEvent';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  constructor(private authService: AuthorizationService, private userService: UserService, private http: HttpClient, private curriculumAdapter: CurriculumAdapter) { }

  url: string = `${environment.revAssureBase}curriculum`;
  associateURL: string = `${environment.revAssureBase}curriculum/assigned`;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": ""
    })
  };
  
  curriculums: Curriculum[];

  private eventUpdate = new Subject<any>(); 

  createCurriculum(newTitle: string){
    let newCurriculum: Curriculum = {
      id: 0,
      name: newTitle,
      trainer: this.userService.getUserObject(),
      events: [],
      users: []
    }
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.post<Curriculum>(this.url, newCurriculum, this.httpOptions)

  }

  convertToCalendarEvent(e: any) {
    console.log(e.topic)
    let foundTopic = this.userService.getTopics().filter(t => {
      console.log(t.id + " " + e.id)
      return t.id == e.topic.id
    })
    let title = foundTopic[0].title;
    console.log(title)
    let date = new Date(e.startDatetime * 1000)
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    month = parseInt(month) < 10 ? '0' + month.toString() : month
    let day = (date.getDate()).toString();
    day = parseInt(day) < 10 ? '0' + day.toString() : day
    let eventTime = `${year}-${month}-${day}`
    let calEvent: CalendarEvent = {
      id: e.id,
      title: e.topic.title,
      start: eventTime,
      description: e.topic.description,
      estimatedDuration: e.topic.estimatedDuration,
      lectureNotes: e.topic.lectureNotes,
      githubRepo: e.topic.githubRepo,
      trainer: e.topic.trainer,
      technologyCategory: e.topic.technologyCategory
    }
    return calEvent
  }

  addEvent(event: any) {
    console.log(this.authService.jwt)
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.post(`${environment.revAssureBase}event`, event, this.httpOptions)
  }

  deleteEventById(id: number) {
    console.log(this.authService.jwt)
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.delete(`${environment.revAssureBase}event/${id}`, this.httpOptions)
  }

  getCurriculum(isTrainer: boolean): Observable<Curriculum[]>{
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
      if(isTrainer) {
        console.log("Trainer")
        return this.http.get<Curriculum[]>(this.url, this.httpOptions)
      } else {
        console.log("Associate")
        return this.http.get<Curriculum[]>(this.url + "/assigned", this.httpOptions)
      }
  }

  getCurriculumById(curriculumId: number): Observable<Curriculum[]>{
    let result = []
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.get<Curriculum[]>(this.url, this.httpOptions);
    
  }

  getCurriculumAssociate() {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.get<any[]>(this.associateURL, this.httpOptions)
  }
 
}