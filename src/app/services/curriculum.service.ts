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
import { Topic } from '../topic';

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

  /**
   * Performs a POST to "/curriculum" to register a new curriculum to database.
   * All fields are initialized to appropriate falsy values except for title (uses function param as title)
   * and trainer (uses currently logged in user).
   * @param newTitle - (string) Title of new Curriculum
   * @returns - an Observable of new Curriculum as it is persisted in database.
   */
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

  /**
   * Converts an object representing an Event to a CalendarEvent object that is compatible with FullCalendar API.
   * @param e - Object to be converted
   * @param topics - (Topic[]) Array of topics that should contain the Topic the Event is derived from.
   * @returns - Converted CalendarEvent.
   */
  convertToCalendarEvent(e: any, topics: Topic[]) {
    let foundTopic = topics.filter(t => {
      return t.id == e.topic.id
    })
    let title = foundTopic[0].title;
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

  /**
   * Performs a POST to "/event" to register a new Event to database.
   * @param event - Object representing Event to be persisted.
   * @returns - an Observable of Object representing Event as it is persisted.
   */
  addEvent(event: any) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.post(`${environment.revAssureBase}event`, event, this.httpOptions)
  }

  /**
   * Performs a DELETE to "/event/{id}" to delete an Event with ID {id} to database.
   * @param id - (number) ID of Event to be deleted.
   * @returns - an Observable that completes when a response is received from endpoint.
   */
  deleteEventById(id: number) {
    console.log(this.authService.jwt)
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.delete(`${environment.revAssureBase}event/${id}`, this.httpOptions)
  }

  /**
   * Performs a GET depending on whether current user is a Trainer or not.
   * If Trainer: GET "/curriculum", returns curricula owned by user.
   * If Associate: GET "/curriculum/assigned", returns curricula assigned to user.
   * @param isTrainer - (boolean) Denotes whether current user is a trainer or not.
   * @returns - an Observable of the Curriculum array retrieved.
   */
  getCurriculum(isTrainer: boolean): Observable<Curriculum[]>{
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
      if(isTrainer) {
        return this.http.get<Curriculum[]>(this.url, this.httpOptions)
      } else {
        console.log("Associate")
        return this.http.get<Curriculum[]>(this.url + "/assigned", this.httpOptions)
      }
  }

  /**
   * Same as getCurriculum(), but always assumes the current user is an associate.
   * Performs a GET on "/curriculum/assigned" for curricula assigned to user.
   * @returns - an Observable of the Curriculum array retrieved.
   */
  getCurriculumAssociate() {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.get<any[]>(this.associateURL, this.httpOptions)
  }
 
}