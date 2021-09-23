import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';
import { servicesVersion } from 'typescript';
import { Topic } from 'src/app/topic';
import { Curriculum } from 'src/app/curriculum';
import { Module } from 'src/app/module';

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
  topics: Topic[];
  curricula: Curriculum[];
  modules: Module[];
  ownedCurricula: Curriculum[];

  registerNewUser() {
    const newUser: User & {password: string} = {
      id: 0,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.password,
      trainer: this.isTrainer,
      topics: this.topics,
      curricula: this.curricula,
      modules: this.modules,
      ownedCurricula: this.ownedCurricula
    }
    let returnedUser;
    this.service.registerNewUser(newUser).subscribe((result) => {
      console.log(result)
      returnedUser = result
      console.log(returnedUser)
    });
  }

}
