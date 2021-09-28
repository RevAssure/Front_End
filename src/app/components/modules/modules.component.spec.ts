/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';

import { ModulesComponent } from './modules.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbAccordion, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-navbar',
  template: ''
})
class FakeNavbarComponent implements Partial<NavbarComponent>{}
describe('ModulesComponent', () => {
  let component: ModulesComponent;
  let fixture: ComponentFixture<ModulesComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgbModule],
      declarations: [ ModulesComponent, NgbAccordion, FakeNavbarComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
