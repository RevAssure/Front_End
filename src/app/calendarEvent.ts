import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { Curriculum } from './curriculum';
import { TechnologyCategory } from './technologycategory';
import { Topic } from './topic';
import { User } from './user';

export class CalendarEvent {
    constructor(
    public id: number,
    public title: string,
    public start: string,
    public description: string,
    public estimatedDuration: number,
    public lectureNotes: string,
    public githubRepo: string,
    public trainer: User,
    public technologyCategory: TechnologyCategory,
    ){}
}