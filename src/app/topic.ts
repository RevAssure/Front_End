import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { Module } from './module';
import { TechnologyCategory } from './technologycategory';
import { User } from './user';

export class Topic {
    constructor(
    public id: number,
    public title: string,
    public description: string,
    public estimatedDuration: number,
    public lectureNotes: string,
    public githubRepo: string,
    public trainer: User,
    public technologyCategory: TechnologyCategory,
    public modules: Module[]
    ){}
}

@Injectable({
    providedIn: 'root',
  })
export class TopicAdapter implements Adapter<Topic>{
    adapt(newTopic:any):Topic{
        return new Topic(
            newTopic.id,
            newTopic.title,
            newTopic.description,
            newTopic.estimatedDuration,
            newTopic.lectureNotes,
            newTopic.githubRepo,
            newTopic.trainer,
            newTopic.technologyCategory,
            newTopic.modules
        )
    }
}