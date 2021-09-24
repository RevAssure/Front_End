import { Component, Input, OnInit } from '@angular/core';
import { Module } from 'src/app/module';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-module-list-item',
  templateUrl: './module-list-item.component.html',
  styleUrls: ['./module-list-item.component.css']
})
export class ModuleListItemComponent implements OnInit {

  @Input() module: Module;

  constructor(private topicService: TopicService, private authService: AuthorizationService) { }

  ngOnInit(): void {
  }


}
