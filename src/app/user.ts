import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { Curriculum } from './curriculum';
import { Module } from './module';
import { Topic } from './topic';

export class User {
    constructor(
    public id: number,
    public username: string,
    public firstName: string,
    public lastName: string,
    public trainer: boolean,
    public topics: Topic[],
    public curricula: Curriculum[],
    public modules: Module[],
    public ownedCurricula: Curriculum[]
    ){}
}

@Injectable({
    providedIn: 'root',
  })
export class UserAdapter implements Adapter<User>{
    /**
     * Converts DTO into User object.
     * @param revUser: DTO of User.
     * @returns User
     */
    adapt(revUser:any):User{
        return new User(
            revUser.id,
            revUser.username,
            revUser.firstName,
            revUser.lastName,
            revUser.trainer,
            revUser.topics,
            revUser.curricula,
            revUser.modules,
            revUser.ownedCurricula
        )
    }
}