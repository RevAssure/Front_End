import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Calendar, EventClickArg, EventHoveringArg } from '@fullcalendar/core';
import { CalendarOptions } from '@fullcalendar/common';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { Router } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Event } from 'src/app/event';
import { ActivatedRoute } from '@angular/router';
import { TopicService } from 'src/app/services/topic.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Curriculum } from 'src/app/curriculum';
import { UserService } from 'src/app/services/user.service';
import { Topic } from 'src/app/topic';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent } from 'src/app/calendarEvent';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {
  constructor(private modalService: NgbModal, private userService: UserService, private authService: AuthorizationService, private topicService: TopicService, private curriculumService: CurriculumService, private router: Router, private activatedRoutes: ActivatedRoute) { 
  }

  /**
   * On-initialization setup.
   */
  ngOnInit(): void {
    // Extracts URL params and retrieve list of current user's topics if they are a trainer.
    let initialDate: string | null = this.activatedRoutes.snapshot.queryParamMap.get('viewDate')
    this.isTrainer = this.userService.isTrainer();
    this.isInitialized = false
    this.curriculumId = this.activatedRoutes.snapshot.paramMap.get("id")
    this.topicService.getAllTopicsByTrainer(this.authService.jwt).subscribe(result => this.topics = result)

    // Calls CurriculumService function to retrieve the curriculum with the requested ID and display it.
    // Includes CalendarOptions initialization for FullCalendar API.
    this.curriculumService.getCurriculum(this.isTrainer).subscribe((result) => {
      this.curriculum = result.filter(c => c.id == this.curriculumId)[0]
      for(let e of this.curriculum.events) {
        let date = new Date(e.startDatetime * 1000)
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        month = parseInt(month) < 10 ? '0' + month.toString() : month
        let day = date.getDate().toString();
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
        this.calendarEvents.push(calEvent)
      }
      if(initialDate) {
        this.calendarOptions.initialDate = initialDate;
        this.calendarOptions.initialView = 'dayGridDay';
        this.currentView = "dayGridDay"
      } else {
        this.calendarOptions.initialView = 'dayGridMonth';
      }
      this.calendarOptions.events = this.calendarEvents;
      this.isInitialized = true;
    })
  }

  // Variable declarations
  isInitialized: boolean = false;
  curriculumId: any
  curriculum: Curriculum
  events: Event[] = []
  calendarEvents: any[] = []
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @ViewChild('viewEvent') modal: ElementRef;
  currentView: string;
  topics: Topic[] = []
  selectedTopic: number
  currentEvent: CalendarEvent;
  isTrainer: boolean;

  /**
   * @returns reference to FullCalendar API.
   */
  getCalendarApi() {
    return this.calendarComponent.getApi();
  }

  /**
   * Reloads the calendar display and attempts to navigate back to the same day the view was previously focused on.
   */
  reloadPage() {
    let api = this.getCalendarApi()
    let date = new Date(api.getDate())
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    month = parseInt(month) < 10 ? '0' + month.toString() : month
    let day = date.getDate().toString();
    day = parseInt(day) < 10 ? '0' + day.toString() : day
    let navigateToDate = `${year}-${month}-${day}`

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`/curriculum/${this.curriculumId}`], {queryParams: {
      viewDate: navigateToDate
    }});
    
  }

  /**
   * Pops up a modal.
   * @param content Content to be rendered in modal.
   */
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  /**
   * Calls CurriculumService function to insert an Event for currently selected Topic to the selected day.
   * Refreshes calendar after the request completes.
   */
  addTopicToDay() {
    let calendarApi = this.getCalendarApi()
    let date = new Date(calendarApi.getDate())
    let e = {
      id: 0,
      startDatetime: date.getTime() / 1000,
      curriculum: parseInt(this.curriculumId),
      topic: this.selectedTopic
    }
    this.curriculumService.addEvent(e).subscribe((result) => {
      let newEvent: CalendarEvent = this.curriculumService.convertToCalendarEvent(result, this.topics)
      this.calendarEvents.push(newEvent);
      this.calendarOptions.events = this.calendarEvents
      this.reloadPage()
    })
  }
  /**
   * Calls CurriculumService function to deletes an event from the curriculum.
   * Refreshes calendar after the request completes.
   * @param id (number) ID of Event to be deleted. 
   */
  deleteEvent(id: number) {
    this.curriculumService.deleteEventById(id).subscribe(result => this.reloadPage())
  }

  /**
   * Switches calendar to Day View and navigates to selected day when a day is clicked.
   * @param arg 
   */
  handleDateClick (arg: any) {
    let calendarApi = this.getCalendarApi()
    calendarApi.changeView("dayGridDay", arg.dateStr)
    let date = new Date(calendarApi.getDate())
    this.currentView = calendarApi.view.type
  }

  // Default values declaration for CalendarOptions.
  calendarOptions: CalendarOptions & {dateClick: any} = {
    customButtons: {
      month: {
        text: 'Month',
        click: () => {
          let calendarApi = this.calendarComponent.getApi();
          calendarApi.changeView("dayGridMonth")
          this.currentView = this.calendarComponent.getApi().view.type
        }
      },
      week: {
        text: 'Week',
        click: () => {
          let calendarApi = this.calendarComponent.getApi();
          calendarApi.changeView("dayGridWeek")
          this.currentView = this.calendarComponent.getApi().view.type
        }
      }
    },
    headerToolbar: {
      right: 'today,week,month prev,next',
      left: 'title',
      center:''
    },
    weekends: false,
    // initialView: 'dayGridMonth',
    fixedWeekCount: false,
    dateClick: this.handleDateClick.bind(this),
    selectable: true,
    dayMaxEventRows: true,
    // events: this.calendarEvents,
    eventColor: '#72a4c2',
    eventDisplay: 'block',
    eventMouseEnter: function(arg: EventHoveringArg) {
      arg.el.style.backgroundColor = '#1e90ff'
    },
    eventMouseLeave: function(arg: EventHoveringArg) {
      arg.el.style.backgroundColor = '#72a4c2'
    },
    eventClick: (info: EventClickArg) => {
      let id = info.event.id;
      let event = this.calendarEvents.filter(el => el.id == id)
      this.currentEvent = event[0];
      this.open(this.modal)
    }
  };

}
