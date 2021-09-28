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

  /**
   * Set boolean flag that decides whether Edit button should appear for current list item, 
   * based on whether current user owns this Module.
   */
  ngOnInit(): void {
    if(this.module?.trainer?.id === this.userService.getUserId()){
      this.canDisplayEditButton = true;
    }
  }

  /**
   * Routes to URL specified by HTML document's logic.
   * Intended for navigating to detailed view of module when clicked.
   * @param endpoint (string) URL to route to.
   * @param params URL params.
   */
  routeToTopic(endpoint: string[], params: object) {
    this.router.navigate(endpoint, params)
  }

  /**
   * Routes to URL of Update Module Component.
   * @param moduleId (number) ID of Module to route to.
   */
  routeToEditModule(moduleId: number) {
    this.router.navigateByUrl(`/module/${moduleId}`);
  }
}
