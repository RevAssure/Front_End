import { TechnologyCategory } from './technologycategory';
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