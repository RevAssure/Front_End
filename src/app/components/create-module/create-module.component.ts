import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleService } from 'src/app/services/module.service';
import { TechCategoryService } from 'src/app/services/tech-category.service';
import { TechnologyCategory } from 'src/app/technologycategory';

/**
 * This component displays a form for trainer to create a module
 */
@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.css']
})
export class CreateModuleComponent implements OnInit {

  //Inject services to grab information and Router for routing
  constructor(private moduleService: ModuleService, private techCategoryService: TechCategoryService, 
    private authService: AuthorizationService, private router: Router) { }

  //information will be used to create a new module
  name: string = "";
  description: string = "";
  techCategoryId: string = "";
  techCategories: TechnologyCategory[] = [];

  // boolean describing the state of the operation, successfully created or not
  successful: boolean = false;

  /**
   * On init, retrieve cached array of TechnologyCategories
   */
  ngOnInit() {
    this.techCategories = this.techCategoryService.categories;
  }

  /**
   * Constructs a Module DTO from user input and passes it into ModuleService function to insert it into database.
   * Routes back to Module list view afterwards.
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
