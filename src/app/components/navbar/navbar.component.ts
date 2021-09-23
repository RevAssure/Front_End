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

  ngOnInit(): void {
  }
  
  user = {
    username: "Username",
    trainer: true
  }
}
