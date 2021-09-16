import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {

  constructor(private activatedRoutes: ActivatedRoute, private service: CurriculumService) { }

  params: any = ""
  events: any[] = []

  ngOnInit(): void {
    this.params = this.activatedRoutes.snapshot.paramMap.get("date")
    this.events = this.service.getEvents().filter(e => e.date === this.params)
  }

}
