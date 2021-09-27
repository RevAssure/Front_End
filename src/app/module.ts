import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { TechnologyCategory } from './technologycategory';
import { Topic } from './topic';
import { User } from './user';

export class Module {
    constructor(
    public id: number,
    public name: string,
    public description: string,
    public trainer: User,
    public technologyCategory: TechnologyCategory,
    public topics: Topic[]
    ){}
}

@Injectable({
    providedIn: 'root',
  })
export class ModuleAdapter implements Adapter<Module>{
    /**
     * Converts DTO into Module object.
     * @param newModule: DTO of Module.
     * @returns Module
     */

    adapt(newModule:any):Module{
        return new Module(
            newModule.id,
            newModule.name,
            newModule.description,
            newModule.trainer,
            newModule.technologyCategory,
            newModule.topics
        )
    }
}