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
  moduleId: string = "0";
  successfulUpdate: boolean = false;
  successfulDelete: boolean = false;
  successfulClone: boolean = false;

  passedTopic: Topic;
  isTopicOwner: boolean = false;

  techCategories : TechnologyCategory[] = [];
  modules: Module[] = [];

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
      this.moduleId = `${this.passedTopic.modules[0].id}`;

      this.isTopicOwner = topic.trainer.id === this.userService.getUserId();
    });
    this.techCategories = this.techCategoryService.categories;
  }

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
    if (this.moduleId != "0") {
      let module = this.moduleService.getModuleById(Number.parseInt(this.moduleId));
      if (module != null) {
        updatedTopic.modules.push(module)
      }
    }
    console.log(updatedTopic);
    this.topicService.updateTopic(this.authService.jwt, updatedTopic).subscribe( (result) => {
      console.log(result);
      this.successfulUpdate = true;
      setTimeout(() => {
        this.goBack();
      }, 3000);
    });
  }

  deleteTopic() {
    this.topicService.deleteTopicById(this.authService.jwt, this.id).subscribe(_ => { 
      console.log(`Deleted topic #{id}.`);
      this.successfulDelete = true;
      setTimeout(() => {
        this.goBack();
      }, 3000);
    });
  }
  //TODO: implement cloneTopic()
  cloneTopic() {
    let newClone: Topic = this.passedTopic;
    newClone.trainer = this.userService.getUserObject();
    this.topicService.createTopic(this.authService.jwt, newClone).subscribe((_) => {
      this.successfulClone = true;
      setTimeout(() => {
        this.goBack();
      }, 3000);
    })
  }

  goBack() {
    this.location.back();
  }
}
