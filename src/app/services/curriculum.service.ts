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

  /**
   * This function creates a new curriculum and persists it to the database
   * @param newTitle Title of the new curriculum
   * @returns an Observable of the newly created curriculum from the database
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
   * This function converts a database event into a FullCalendar calendar event object
   * @param e the database event that needs parsing
   * @param topics All topics that belong to the curriculum
   * @returns A FullCalendar event object
   */
  convertToCalendarEvent(e: any, topics: Topic[]) {
    let foundTopic = topics.filter(t => {
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

  /**
   * Adds an event to the Database
   * @param event Event Object
   * @returns Observable of new event object
   */
  addEvent(event: any) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.post(`${environment.revAssureBase}event`, event, this.httpOptions)
  }

  /**
   * Deletes an event by the event's id
   * @param id id of event to be deleted
   * @returns Observable of delete request
   */
  deleteEventById(id: number) {
    console.log(this.authService.jwt)
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.delete(`${environment.revAssureBase}event/${id}`, this.httpOptions)
  }

  /**
   * Retrives the curricula belonging to the user
   * @param isTrainer boolean denoting whether the current user is a trainer or not
   * @returns Observable of owned curricula
   */
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

  /**
   * Retrieves associates belonging to curriculum
   * @returns Observable of associates belonging to curriculum
   */
  getCurriculumAssociate() {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${this.authService.jwt}`);
    return this.http.get<any[]>(this.associateURL, this.httpOptions)
  }
 
}