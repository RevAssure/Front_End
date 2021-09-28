import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AllTopicsComponent } from './all-topics.component';
import { NavbarComponent} from '../navbar/navbar.component';
import { Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  template: ''
})
class FakeNavbarComponent implements Partial<NavbarComponent>{}
describe('AllTopicsComponent', () => {
  let component: AllTopicsComponent;
  let fixture: ComponentFixture<AllTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ AllTopicsComponent, FakeNavbarComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
