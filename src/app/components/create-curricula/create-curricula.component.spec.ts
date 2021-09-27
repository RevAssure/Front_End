import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent} from '../navbar/navbar.component';
import { Component } from '@angular/core';
import { CreateCurriculaComponent } from './create-curricula.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  template: ''
})
class FakeNavbarComponent implements Partial<NavbarComponent>{}
describe('CreateCurriculaComponent', () => {
  let component: CreateCurriculaComponent;
  let fixture: ComponentFixture<CreateCurriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), HttpClientTestingModule, FormsModule],
      declarations: [ CreateCurriculaComponent, FakeNavbarComponent],
      //providers: [Router]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCurriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
