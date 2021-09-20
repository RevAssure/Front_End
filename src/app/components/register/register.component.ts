import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';
import { servicesVersion } from 'typescript';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit(): void {
  }

  firstName: string;
  lastName: string;
  username: string;
  password: string;
  isTrainer: boolean = false;

  registerNewUser() {
    const newUser: User & {password: string} = {
      id: 0,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.password,
      trainer: this.isTrainer
    }
    let returnedUser;
    this.service.registerNewUser(newUser).subscribe((result) => {
      console.log(result)
      returnedUser = result
    });
  }

}
