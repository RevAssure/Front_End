import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';

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
  failedLogin: boolean = false;

  login() {
    this.userService.login(this.username, this.password).subscribe((result) => {
      this.failedLogin = false;
      this.authService.setJwt(result);
      console.log(this.userService.getFirstName());
      console.log(this.userService.getCurricula())
      this.router.navigateByUrl("/dashboard");
    },
      (error) => {
        console.log(error);
        this.failedLogin = true;
      })
  }
}