/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateTopicComponent } from './create-topic.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent} from '../navbar/navbar.component';
import { Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  template: ''
})
class FakeNavbarComponent implements Partial<NavbarComponent>{}
describe('CreateTopicComponent', () => {
  let component: CreateTopicComponent;
  let fixture: ComponentFixture<CreateTopicComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [ CreateTopicComponent, FakeNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
