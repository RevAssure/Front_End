import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

import { CreateCurriculaComponent } from './create-curricula.component';

fdescribe('CreateCurriculaComponent', () => {
  let component: CreateCurriculaComponent;
  let fixture: ComponentFixture<CreateCurriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), HttpClientModule],
      declarations: [ CreateCurriculaComponent],
      //providers: [Router]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCurriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
