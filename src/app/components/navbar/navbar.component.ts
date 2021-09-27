import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthorizationService, private userService: UserService) { }

  trainer: boolean;
  username: string;
  firstName: string;

  ngOnInit(): void {
    this.trainer = this.userService.isTrainer();
    this.username = this.userService.getUsername();
    this.firstName = this.userService.getFirstName();
  }
}
