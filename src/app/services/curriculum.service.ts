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

  
  constructor() { }

  getEvents() {
    return this.calendarEvents;
  }

  getTopics() {
    return this.topics;
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