import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { CalendarOptions } from '@fullcalendar/common';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handleDateClick (arg: any) {
    alert("Date clicked " + arg.dateStr)
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    fixedWeekCount: false,
    dateClick: this.handleDateClick.bind(this),
    dayMaxEventRows: true,
    events: [
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
    ]
  };

}
