import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { CurriculumComponent } from '../components/curriculum/curriculum.component';
import { DayViewComponent } from '../components/day-view/day-view.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'curriculum', component: CurriculumComponent},
  { path: 'curriculum/:date', component: DayViewComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
