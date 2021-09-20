import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { servicesVersion } from 'typescript';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private service: UserService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  login() {
    this.service.login(this.username, this.password).subscribe(result => console.log(result))
    // this.router.navigateByUrl("/dashboard");
  }
}
