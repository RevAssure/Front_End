import { Component, OnInit } from '@angular/core';
import { TechnologyCategory } from 'src/app/technologycategory';
import { UserService } from 'src/app/services/user.service';
import { TechCategoryService } from 'src/app/services/tech-category.service';
import { TopicService } from 'src/app/services/topic.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Topic } from 'src/app/topic';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute, private moduleService: ModuleService, private location: Location) { 

    }
  
  id: number;
  title: string =  '';
  description: string =  '';
  estimatedDuration: number = 0;
  lectureNotes: string = '';
  githubRepo: string =  '';
  technologyCategoryId: string = "1";
  moduleId: string = "0";

  passedTopic: Topic;

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
    });
    this.techCategories = this.techCategoryService.categories;
  }

  updateTopic() {
    let topicPutBody = {
      id: this.id,
      title: this.title,
      description: this.description,
      estimatedDuration: this.estimatedDuration,
      lectureNotes: this.lectureNotes,
      githubRepo: this.githubRepo,
      trainer: this.userService.getUserId(),
      technologyCategory: Number.parseInt(this.technologyCategoryId),
      modules: [this.moduleId]
    }
    console.log(topicPutBody);
    this.topicService.updateTopic(this.authService.jwt, topicPutBody).subscribe( (result) => console.log(result));
  }

  deleteTopic() {
    this.topicService.deleteTopicById(this.authService.jwt, this.id).subscribe(_ => { 
      console.log(`Deleted topic #{id}.`);
      this.location.back();
    });
  }
}
