/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NavbarComponent} from '../navbar/navbar.component';
import { CreateModuleComponent } from './create-module.component';
import {RouterTestingModule} from '@angular/router/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-navbar',
  template: ''
})
class FakeNavbarComponent implements Partial<NavbarComponent>{}
describe('CreateModuleComponent', () => {
  let mockAuthService: any;
  let mockTechCategoryService: any;
  let mockModuleService: any;
  let component: CreateModuleComponent;
  let fixture: ComponentFixture<CreateModuleComponent>;
  

  const mockDTO: any = {
    name: 'testName',
    description: 'testDescription',
    technologyCategory: 0  
  }

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ CreateModuleComponent, FakeNavbarComponent],
    })
    .compileComponents();
    mockAuthService = jasmine.createSpyObj('AuthorizationService', ['jwt']);
    mockTechCategoryService = jasmine.createSpyObj('TechCategoryService', ['categories']);
    mockModuleService = jasmine.createSpyObj('ModuleService', ['createModule']);

    mockAuthService.jwt;
    mockTechCategoryService.categories;
    mockModuleService.createModule(mockAuthService.jwt, mockDTO);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
