import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';
import { servicesVersion } from 'typescript';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private userService: UserService, private authService: AuthorizationService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  firstName: string;
  lastName: string;

  login() {
    this.userService.login(this.username, this.password).subscribe((result) => {
      console.log("boop");
      this.authService.setJwt(result);
      this.getFullName();
      this.userService.getFirstName().subscribe(firstName => {
        this.firstName = firstName;
        console.log(firstName);
      });
      this.userService.getLastName().subscribe(lastName => {
        this.lastName = lastName;
        console.log(lastName);
      });
      this.router.navigateByUrl("/dashboard");
    })
    
  }

  getFullName() {
    this.userService.getFullName(this.authService.jwt)
  }
}
