import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';

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
  failedRegister: boolean = false;
  successful: boolean = false;

  registerNewUser() {
    const newUser: User & {password: string} = {
      id: 0,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.password,
      trainer: this.isTrainer,
      topics: [],
      curricula: [],
      ownedCurricula: [],
      modules: []
    }
    let returnedUser;
    console.log(newUser)
    this.service.registerNewUser(newUser).subscribe((result) => {
      this.failedRegister = false;
      console.log(result)
      returnedUser = result
      console.log(returnedUser)
      this.successful = true;
      
    },
    (error) => {
      console.log(error);
      this.failedRegister = true;
      this.successful = false;
    });
  }

}
