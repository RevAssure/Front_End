import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { User } from './user';
import { Event } from 'src/app/event';

export class Curriculum {
    constructor(
    public id: number,
    public name: string,
    public trainer: User,
    public events: Event[],
    public users: User[]
    ){}
}

@Injectable({
    providedIn: 'root',
  })
export class CurriculumAdapter implements Adapter<Curriculum>{
    /**
     * Converts DTO into Curriculum object.
     * @param newTopic: DTO of Curriculum.
     * @returns Curriculum
     */
    adapt(newCurriculum:any):Curriculum{
        return new Curriculum(
            newCurriculum.id,
            newCurriculum.name,
            newCurriculum.trainer,
            newCurriculum.events,
            newCurriculum.users
        )
    }
}