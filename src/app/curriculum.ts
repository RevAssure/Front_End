import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { User } from './user';

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