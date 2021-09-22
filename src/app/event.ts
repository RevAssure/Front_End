import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { Curriculum } from './curriculum';
import { Topic } from './topic';

export class Event {
    constructor(
    public id: number,
    public curriculum: Curriculum,
    public startDatetime: number,
    public topic: Topic
    ){}
}

@Injectable({
    providedIn: 'root',
  })
export class EventAdapter implements Adapter<Event>{
    adapt(newEvent:any):Event{
        return new Event(
            newEvent.id,
            newEvent.curriculum,
            newEvent.startDatetime,
            newEvent.topic
        )
    }
}