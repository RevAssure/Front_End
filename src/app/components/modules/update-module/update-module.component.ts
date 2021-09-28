import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Module } from 'src/app/module';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleService } from 'src/app/services/module.service';
import { TechnologyCategory } from 'src/app/technologycategory';
import { Location } from '@angular/common';
import { TechCategoryService } from 'src/app/services/tech-category.service';

@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.css']
})
export class UpdateModuleComponent implements OnInit {

  constructor(private moduleService: ModuleService, private route: ActivatedRoute,
    private authService: AuthorizationService, private location: Location, private techCategoryService: TechCategoryService) { }

  id: number = 0;
  name: string = "";
  description: string = "";
  techCategoryId: string = "";

  techCategories: TechnologyCategory[] = [];

  successful: boolean = false;

  ngOnInit() {
    //Refresh the list of modules first to ensure that newly added Modules from the current session are able to be edited
    this.moduleService.getAllModules(this.authService.jwt).subscribe( () => {
      this.id = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
      let currentModule: Module | null = this.moduleService.getModuleById(this.id);
      if(currentModule){
        this.name = currentModule.name;
        this.description = currentModule.description;
        this.techCategoryId = `${currentModule.technologyCategory.id}`;
      }
    });
    this.techCategories = this.techCategoryService.categories;   
  }

  /**
   * Update a module with new information. On successful update reroutes back to the modules list.
   */
  updateModule(){
    let moduleDto = {
      id: this.id,
      name: this.name,
      description: this.description,
      technologyCategory: Number.parseInt(this.techCategoryId)
    }
    this.moduleService.updateModule(this.authService.jwt, moduleDto).subscribe( () => {
      this.successful = true;
      setTimeout( () => {
        this.location.back();
      }, 3000);
    });
  }

  


}
