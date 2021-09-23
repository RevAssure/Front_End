import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/topic';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnInit {

  constructor() { }

  topic : Topic;

  ngOnInit() {
  }

  
}
