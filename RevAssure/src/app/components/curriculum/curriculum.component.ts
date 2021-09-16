import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { CalendarOptions } from '@fullcalendar/common';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {

  events: any[] = []

  constructor(private service: CurriculumService, private router: Router) { }

  ngOnInit(): void {
    
  }

  handleDateClick (arg: any) {
    this.router.navigate([`/curriculum/${arg.dateStr}`])
  }


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    fixedWeekCount: false,
    dateClick: this.handleDateClick.bind(this),
    selectable: true,
    dayMaxEventRows: true,
    events: this.service.getEvents()
  };

}
