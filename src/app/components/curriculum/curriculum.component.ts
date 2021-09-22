import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar, EventHoveringArg } from '@fullcalendar/core';
import { CalendarOptions } from '@fullcalendar/common';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { Router } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {

  events: any[] = []
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  constructor(private service: CurriculumService, private router: Router) { 
    
  }

  ngOnInit(): void {
    
  }

  getCalendarApi() {
    return this.calendarComponent.getApi();
  }

  handleDateClick (arg: any) {
    // this.router.navigate([`/curriculum/${arg.dateStr}`])
    let calendarApi = this.getCalendarApi()
    calendarApi.changeView("dayGridDay", arg.dateStr)
  }


  calendarOptions: CalendarOptions & {dateClick: any} = {
    customButtons: {
      month: {
        text: 'Month',
        click: () => {
          let calendarApi = this.calendarComponent.getApi();
          calendarApi.changeView("dayGridMonth")
        }
      },
      week: {
        text: 'Week',
        click: () => {
          let calendarApi = this.calendarComponent.getApi();
          calendarApi.changeView("dayGridWeek")
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
