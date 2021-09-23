import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';
import { Curriculum } from 'src/app/curriculum';
import { CurriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService, private curriculumService: CurriculumService) { }

  trainer: boolean;
  username: string;
  // curriculums: Curriculum[];
  curriculums: string[] = ["Java Enterprise", "Salesforce"];
  ngOnInit() {
    this.trainer = this.userService.isTrainer();
    this.username = this.userService.getUsername();
    // this.curriculumService.getCurriculum().subscribe(result => this.curriculums = result);
  }



  
}
