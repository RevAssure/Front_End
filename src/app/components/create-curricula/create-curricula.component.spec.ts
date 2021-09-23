import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCurriculaComponent } from './create-curricula.component';

describe('CreateCurriculaComponent', () => {
  let component: CreateCurriculaComponent;
  let fixture: ComponentFixture<CreateCurriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCurriculaComponent ]
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
