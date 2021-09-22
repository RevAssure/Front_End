import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { Module } from './module';
import { Topic } from './topic';

export class TechnologyCategory {
    constructor(
    public id: number,
    public name: string,
    public topics: Topic[],
    public modules: Module[]
    ){}
}

@Injectable({
    providedIn: 'root',
  })
export class TechnologyCategoryAdapter implements Adapter<TechnologyCategory>{
    adapt(newTechnologyCategory:any):TechnologyCategory{
        return new TechnologyCategory(
            newTechnologyCategory.id,
            newTechnologyCategory.name,
            newTechnologyCategory.topics,
            newTechnologyCategory.modules
        )
    }
}