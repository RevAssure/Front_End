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
        let techCategory = new TechnologyCategory(
            newTechnologyCategory.id,
            newTechnologyCategory.name,
            [],
            []
        )
        if(newTechnologyCategory.topics){
            techCategory.topics = newTechnologyCategory.topics;
        }
        if(newTechnologyCategory.modules){
            techCategory.modules = newTechnologyCategory.modules;
        }
        return techCategory;
    }
}