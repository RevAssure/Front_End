import { Component, OnInit } from '@angular/core';
import { TechnologyCategory } from 'src/app/technologycategory';
import { Topic } from 'src/app/topic';
import { UserService } from 'src/app/services/user.service';
import { TechCategoryService } from 'src/app/services/tech-category.service';
import { TopicService } from 'src/app/services/topic.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnInit {

  constructor(private userService: UserService, private techCategoryService: TechCategoryService,
    private topicService: TopicService, private authService: AuthorizationService) { }

  title: string =  '';
  description: string =  '';
  estimatedDuration: number = 0;
  lectureNotes: string = '';
  githubRepo: string =  '';
  technologyCategoryId: string = "1";

  techCategories : TechnologyCategory[] = [];

  ngOnInit() {
    this.techCategories = this.techCategoryService.categories;
  }

  createTopic() {
    let newTopicPostBody = {
      title: this.title,
      description: this.description,
      estimatedDuration: this.estimatedDuration,
      lectureNotes: this.lectureNotes,
      githubRepo: this.githubRepo,
      trainer: this.userService.getUserId(),
      technologyCategory: Number.parseInt(this.technologyCategoryId),
      modules: []
    }
    console.log(newTopicPostBody);
    this.topicService.createTopic(this.authService.jwt, newTopicPostBody).subscribe( (result) => console.log(result));
  }
}
