import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserService } from 'src/app/services/user.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let injector: TestBed;
  let userService: UserService;
  let authService: AuthorizationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [ { provide: UserService, useValue: userService },
                  { provide: AuthorizationService, useValue: authService }]
    })
    .compileComponents();
    injector = getTestBed();
    userService = injector.inject(UserService);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
