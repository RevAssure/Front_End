import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { CurriculumComponent } from '../components/curriculum/curriculum.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ModulesComponent } from '../components/modules/modules.component';
import { CreateModuleComponent } from '../components/create-module/create-module.component';
import { CreateTopicComponent } from '../components/create-topic/create-topic.component';
import { CreateCurriculaComponent } from '../components/create-curricula/create-curricula.component';
import { UpdateTopicComponent } from '../components/update-topic/update-topic/update-topic.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'curriculum', component: CurriculumComponent},
  { path: 'curriculum/:id', component: CurriculumComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'modules', component: ModulesComponent},
  { path: 'createModule', component: CreateModuleComponent},
  { path: 'createTopic', component: CreateTopicComponent},
  { path: 'createCurriculum', component: CreateCurriculaComponent},
  { path: 'topic/:id', component: UpdateTopicComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
