/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NavbarComponent} from '../navbar/navbar.component';
import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbAccordion, NgbModule, NgbPanel } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-navbar',
  template: ''
})
class FakeNavbarComponent implements Partial<NavbarComponent>{}
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgbModule],
      providers: [NgbAccordion],
      declarations: [ DashboardComponent, NgbAccordion, FakeNavbarComponent, NgbPanel]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
