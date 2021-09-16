import { Injectable } from '@angular/core';

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
  ]

  constructor() { }

  getEvents() {
    return this.calendarEvents;
  }

}
