import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService) { }

  trainer: any;

  ngOnInit() {
    this.trainer = this.userService.isTrainer;
    console.log(this.trainer);
  }
  username = this.userService.getUsername;
}
