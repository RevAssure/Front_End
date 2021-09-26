import { Component, OnInit } from '@angular/core';
import { TechnologyCategory } from 'src/app/technologycategory';
import { UserService } from 'src/app/services/user.service';
import { TechCategoryService } from 'src/app/services/tech-category.service';
import { TopicService } from 'src/app/services/topic.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Module } from 'src/app/module';
import { ModuleService } from 'src/app/services/module.service';
import { Router } from '@angular/router';
import { Topic } from 'src/app/topic';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnInit {

  constructor(private userService: UserService, private techCategoryService: TechCategoryService,
    private topicService: TopicService, private authService: AuthorizationService,
    private moduleService: ModuleService, private router: Router) { }

  title: string =  '';
  description: string =  '';
  estimatedDuration: number = 0;
  lectureNotes: string = '';
  githubRepo: string =  '';
  technologyCategoryId: string = "1";
  moduleId: string = "1";

  successful: boolean = false;

  techCategories : TechnologyCategory[] = [];
  modules: Module[] = [];

  ngOnInit() {
    this.techCategories = this.techCategoryService.categories;
    this.moduleService.getAllModules(this.authService.jwt).subscribe(modules => this.modules = modules);
  }

  /**
   * Create a new topic. The newTopicPostBody represents the TopicDto that will be
   * posted to the back-end API.
   */
  createTopic() {
    let newTopic = {
      id: 0,
      title: this.title,
      description: this.description,
      estimatedDuration: this.estimatedDuration,
      lectureNotes: this.lectureNotes,
      githubRepo: this.githubRepo,
      trainer: this.userService.getUserId(),
      technologyCategory: Number.parseInt(this.technologyCategoryId),
      modules: [Number.parseInt(this.moduleId)]
    }
    console.log(newTopic);
    this.topicService.createTopicWithDto(this.authService.jwt, newTopic).subscribe( (result) => {
      console.log(result);
      this.successful = true;
      setTimeout(() => {
        this.router.navigateByUrl("/modules");
      }, 3000);
    });
  }
}
