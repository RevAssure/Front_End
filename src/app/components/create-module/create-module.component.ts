import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private moduleService: ModuleService, private techCategoryService: TechCategoryService, 
    private authService: AuthorizationService, private router: Router) { }

  name: string = "";
  description: string = "";
  techCategoryId: string = "";

  techCategories: TechnologyCategory[] = [];

  successful: boolean = false;

  ngOnInit() {
    this.techCategories = this.techCategoryService.categories;
  }

  /**
   * Create a new Module by supplying a DTO object.
   */
  createModule(){
    let moduleDto = {
      name: this.name,
      description: this.description,
      technologyCategory: this.techCategoryId  
    }
    this.moduleService.createModule(this.authService.jwt, moduleDto).subscribe(
      (module) => {
        console.log(module);
        this.successful = true;
        setTimeout( () => this.router.navigateByUrl('/modules'), 3000);
      });
  }
}
