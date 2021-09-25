import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import { Topic } from 'src/app/topic';

@Component({
  selector: 'app-all-topics',
  templateUrl: './all-topics.component.html',
  styleUrls: ['./all-topics.component.css']
})
export class AllTopicsComponent implements OnInit {
  topics: Topic[] = [];
  myTopics: Topic[] = [];
  isShowingAll: boolean = true;
  isShowingMy: boolean = false;

  constructor(private topicService: TopicService, private authService: AuthorizationService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics(): void {
    this.topicService.getAllTopics(this.authService.jwt).subscribe(topics => {
      this.topics = topics;
      this.myTopics = [];
      for (let topic of topics) {
        if (topic.trainer.id === this.userService.getUserId()) {
          this.myTopics.push(topic);
        }
      }
    });
  }

  refresh(): void {
    this.getTopics();
  }

  showAll(): void {
    this.isShowingAll = true;
    this.isShowingMy = false;
  }

  showMy(): void {
    this.isShowingAll = false;
    this.isShowingMy = true;
  }
}
