import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';

/**
 * The navbar component is used to display a navigation bar at the
 * top of the web page and will be utilized in every components
 * of this application.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Inject AuthorizationService and UserService to bring in methods to grab needed information
  constructor(private authService: AuthorizationService, private userService: UserService) { }

  // A boolean determines if user logged in is trainer or associate
  trainer: boolean;
  // the username of user logged in
  username: string;
  // the firstname of user logged in
  firstName: string;

  // Set properties when on initiation by calling the service methods
  ngOnInit(): void {
    this.trainer = this.userService.isTrainer();
    this.username = this.userService.getUsername();
    this.firstName = this.userService.getFirstName();
  }
}