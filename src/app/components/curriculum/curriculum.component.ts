import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar, EventHoveringArg } from '@fullcalendar/core';
import { CalendarOptions } from '@fullcalendar/common';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { Router } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Event } from 'src/app/event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {



  constructor(private service: CurriculumService, private router: Router, private activatedRoutes: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.topics = this.service.getTopics()
    this.curriculumId = this.activatedRoutes.snapshot.paramMap.get("id")
  }

  curriculumId: any
  events: any[] = []
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  currentView: string;
  topics: any[] = []
  selectedTopic: number

  getCalendarApi() {
    return this.calendarComponent.getApi();
  }

  addTopicToDay() {
    let e = {
      id: 0,
      startDatetime: new Date().getMilliseconds(),
      curriculum: parseInt(this.curriculumId),
      topic: this.selectedTopic
    }
    console.log(e)
    this.service.addEvent(e).subscribe(result => {
      console.log(result)
    })
  }

  handleDateClick (arg: any) {
    // this.router.navigate([`/curriculum/${arg.dateStr}`])
    let calendarApi = this.getCalendarApi()
    calendarApi.changeView("dayGridDay", arg.dateStr)
    this.currentView = calendarApi.view.type
  }

  // public id: number,
  // public curriculum: Curriculum,
  // public startDatetime: number,
  // public topic: Topic
  // createEvent() {
  //   let newEvent: Event = {
  //     id: 0,

  //   }
  // }


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
    initialView: 'dayGridMonth',
    fixedWeekCount: false,
    dateClick: this.handleDateClick.bind(this),
    selectable: true,
    dayMaxEventRows: true,
    events: this.service.getEvents(),
    eventColor: '#72a4c2',
    eventMouseEnter: function(arg: EventHoveringArg) {
      arg.el.style.backgroundColor = '#1e90ff'
    },
    eventMouseLeave: function(arg: EventHoveringArg) {
      arg.el.style.backgroundColor = '#72a4c2'
    }
  };

}
