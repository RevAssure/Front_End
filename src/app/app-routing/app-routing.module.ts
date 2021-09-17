import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { CurriculumComponent } from '../components/curriculum/curriculum.component';
import { DayViewComponent } from '../components/day-view/day-view.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ModulesComponent } from '../components/modules/modules.component';
import { CreateModuleComponent } from '../components/create-module/create-module.component';
import { CreateTopicComponent } from '../components/create-topic/create-topic.component';
import { TopicComponent } from '../components/topic/topic.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'curriculum', component: CurriculumComponent},
  { path: 'curriculum/:date', component: DayViewComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'modules', component: ModulesComponent},
  { path: 'createModule', component: CreateModuleComponent},
  { path: 'createTopic', component: CreateTopicComponent},
  { path: 'topic', component: TopicComponent} //TODO: add :id param
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
