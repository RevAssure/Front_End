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

  constructor(private topicService: TopicService, private authService: AuthorizationService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getTopics();
  }

  /**
   * Retrieves all the Topics from the database and sorts it into two Topic arrays, topics (all topics) and myTopics (current trainer's topics)
   */
  getTopics(): void {
    this.topicService.getAllTopics(this.authService.jwt).subscribe(topics => {
      this.topics = topics;
      this.topics = this.topics.sort((a,b) => {
        let textA = a.technologyCategory.name.toUpperCase();
        let textB = b.technologyCategory.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })
      this.myTopics = [];
      for (let topic of topics) {
        if (topic.trainer.id === this.userService.getUserId()) {
          this.myTopics.push(topic);
        }
      }
    });
  }

  /**
   * Re-perform database queries to retrieve updated lists of topics.
   */
  refresh(): void {
    this.getTopics();
  }
}
