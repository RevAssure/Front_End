import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { TechCategoryService } from 'src/app/services/tech-category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private userService: UserService, private authService: AuthorizationService,
    private techCategoryService : TechCategoryService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  failedLogin: boolean = false;

  /**
   * Perform a user login. A successful login will set the JWT for the session and pull a list of 
   * TechnologyCategories, followed by routing the user to their dashboard. Incorrect login credentials
   * will display a message informing the user of their error.
   * 
   * Current limitation: application will wait for TechnologyCategories table to be retrieved.
   * Login will not finish if the request never completes.
   */
  login() {
    this.userService.login(this.username, this.password).subscribe((result) => {
      this.failedLogin = false;
      this.authService.setJwt(result);
      console.log(this.userService.getFirstName());
      this.techCategoryService.getAllCategories(result.jwt).subscribe( (_) => {
        console.log(_);
        this.router.navigateByUrl("/dashboard")});
    },
      (error) => {
        console.log(error);
        this.failedLogin = true;
      })
  }
}