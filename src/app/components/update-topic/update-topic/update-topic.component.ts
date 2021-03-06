import { Component, OnInit } from '@angular/core';
import { TechnologyCategory } from 'src/app/technologycategory';
import { UserService } from 'src/app/services/user.service';
import { TechCategoryService } from 'src/app/services/tech-category.service';
import { TopicService } from 'src/app/services/topic.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Topic } from 'src/app/topic';
import { ActivatedRoute, Router } from '@angular/router';
import { Module } from 'src/app/module';
import { ModuleService } from 'src/app/services/module.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-topic',
  templateUrl: './update-topic.component.html',
  styleUrls: ['./update-topic.component.css']
})
export class UpdateTopicComponent implements OnInit {

  constructor(private userService: UserService, private techCategoryService: TechCategoryService,
    private topicService: TopicService, private authService: AuthorizationService,
    private route: ActivatedRoute, private moduleService: ModuleService,
    private location: Location) { 
    }
  
  id: number;
  title: string =  '';
  description: string =  '';
  estimatedDuration: number = 0;
  lectureNotes: string = '';
  githubRepo: string =  '';
  technologyCategoryId: string = "1";
  moduleId: string = "";
  successfulUpdate: boolean = false;
  successfulDelete: boolean = false;
  successfulClone: boolean = false;

  passedTopic: Topic;
  isTopicOwner: boolean = false;

  techCategories : TechnologyCategory[] = [];
  modules: Module[] = [];

  /**
   * Calls various service layer functions to:
   * - Retrieve array of Modules and TechnologyCategories
   * - Retrieve current values of current Topic's fields
   */
  ngOnInit() {
    this.moduleService.getAllModules(this.authService.jwt).subscribe(modules => 
      this.modules = modules  
    )
    this.topicService.getTopicById(this.authService.jwt, Number(this.route.snapshot.paramMap.get('id'))).subscribe((topic) => {
      this.passedTopic = topic;
      this.id = this.passedTopic.id;
      this.title = this.passedTopic.title;
      this.description = this.passedTopic.description;
      this.estimatedDuration = this.passedTopic.estimatedDuration;
      this.lectureNotes = this.passedTopic.lectureNotes;
      this.githubRepo = this.passedTopic.githubRepo;
      this.technologyCategoryId = `${this.passedTopic.technologyCategory.id}`;
      this.moduleId = `${this.passedTopic.modules[0]?.id}`;

      this.isTopicOwner = topic.trainer.id === this.userService.getUserId();
    });
    this.techCategories = this.techCategoryService.categories;
  }
  /**
   * Calls TopicService function to update the current Topic.
   * Routes to previous view that the client was on afterwards.
   */
  updateTopic() {
    let updatedTopic: Topic = {
      id: this.id,
      title: this.title,
      description: this.description,
      estimatedDuration: this.estimatedDuration,
      lectureNotes: this.lectureNotes,
      githubRepo: this.githubRepo,
      trainer: this.passedTopic.trainer,
      technologyCategory: this.techCategoryService.getCategoryByIdIfExists(Number.parseInt(this.technologyCategoryId)),
      modules: []
    }

    if (this.moduleId) {
      let module = this.moduleService.getModuleById(Number.parseInt(this.moduleId));
      if (module != null) {
        updatedTopic.modules.push(module)
      }
    }
    this.topicService.updateTopic(this.authService.jwt, updatedTopic).subscribe( (result) => {
      this.successfulUpdate = true;
      setTimeout(() => {
        this.goBack();
      }, 3000);
    });
  }
  
  /**
   * Calls TopicService function to delete the current Topic.
   * Routes to previous view that the client was on afterwards.
   */
   deleteTopic() {
    this.topicService.deleteTopicById(this.authService.jwt, this.id).subscribe(_ => { 
      console.log(`Deleted topic #{id}.`);
      this.successfulDelete = true;
      setTimeout(() => {
        this.goBack();
      }, 3000);
    });
  }
  /**
   * Calls TopicService function to insert a clone of the current Topic under current user's ownership.
   * Routes to previous view that the client was on afterwards.
   */
   cloneTopic() {
    let newClone: Topic = this.passedTopic;
    newClone.id = 0;
    newClone.trainer = this.userService.getUserObject();
    this.topicService.createTopic(this.authService.jwt, newClone).subscribe((_) => {
      this.successfulClone = true;
      setTimeout(() => {
        this.goBack();
      }, 3000);
    })
  }

  /**
   * Routes to previous view that the client was on.
   */
  goBack() {
    this.location.back();
  }
}
