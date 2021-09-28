import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from 'src/app/module';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-module-list-item',
  templateUrl: './module-list-item.component.html',
  styleUrls: ['./module-list-item.component.css']
})
export class ModuleListItemComponent implements OnInit {

  @Input() module: Module;

  canDisplayEditButton: boolean = false;

  constructor(private topicService: TopicService, private authService: AuthorizationService, private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    if(this.module.trainer.id === this.userService.getUserId()){
      this.canDisplayEditButton = true;
    }
  }

  routeToTopic(endpoint: string[], params: object) {
    this.router.navigate(endpoint, params)
  }

  routeToEditModule(moduleId: number) {
    this.router.navigateByUrl(`/module/${moduleId}`);
  }
}
