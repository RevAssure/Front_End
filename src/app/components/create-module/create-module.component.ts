import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleService } from 'src/app/services/module.service';
import { TechCategoryService } from 'src/app/services/tech-category.service';
import { TechnologyCategory } from 'src/app/technologycategory';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.css']
})
export class CreateModuleComponent implements OnInit {

  constructor(private moduleService: ModuleService, private techCategoryService: TechCategoryService, private authService: AuthorizationService) { }

  name: string = "";
  description: string = "";
  techCategoryId: string = "";

  techCategories: TechnologyCategory[] = [];

  ngOnInit() {
    this.techCategories = this.techCategoryService.categories;
  }

  createModule(){
    let moduleDto = {
      name: this.name,
      description: this.description,
      technologyCategory: this.techCategoryId  
    }
    this.moduleService.createModule(this.authService.jwt, moduleDto).subscribe((module) => console.log(module));
  }
}
