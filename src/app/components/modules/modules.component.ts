import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/module';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModuleService } from 'src/app/services/module.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {
  allModules: Module[] = [];
  modules: Module[] = [];

  constructor(private moduleService: ModuleService, private authService: AuthorizationService,
    private userService: UserService) { }

  /**
   * Calls ModuleService function to retrieve list of all modules.
   */
  ngOnInit() {
    this.moduleService.getAllModules(this.authService.jwt).subscribe((modules) => {
      this.allModules = modules;
      this.modules = this.allModules;
    });
  }

}
