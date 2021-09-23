import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';
import { Curriculum } from 'src/app/curriculum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService) { }

  trainer: boolean;
  username: string;
  curriculums: string[] = ["Java Enterprise", "Salesforce"];
  ngOnInit() {
    this.trainer = this.userService.isTrainer();
    this.username = this.userService.getUsername();
    // this.curriculums = this.userService.getCurricula();

  }
  
}
