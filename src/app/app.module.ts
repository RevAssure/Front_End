import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { CurriculumComponent } from './components/curriculum/curriculum.component'; // a plugin!
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModulesComponent } from './components/modules/modules.component';
import { CreateModuleComponent } from './components/create-module/create-module.component';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';
import { TopicComponent } from './components/topic/topic.component';
import { UserService } from './services/user.service';
import { CurriculumService } from './services/curriculum.service';
import { AuthorizationService } from './services/authorization.service';
import { TopicService } from './services/topic.service';
import { UserAdapter } from './user';
import { TechCategoryService } from './services/tech-category.service';
import { CreateCurriculaComponent } from './components/create-curricula/create-curricula.component';
import { UpdateTopicComponent } from './components/update-topic/update-topic/update-topic.component';
import { ModuleService } from './services/module.service';
import { ModuleListItemComponent } from './components/modules/module-list-item/module-list-item.component';
import { AllTopicsComponent } from './components/all-topics/all-topics.component';
import { MyTopicsComponent } from './components/my-topics/my-topics.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CurriculumComponent,
    DashboardComponent,
    ModulesComponent,
    CreateModuleComponent,
    CreateTopicComponent,
    TopicComponent,
    CreateCurriculaComponent,
    UpdateTopicComponent,
    ModuleListItemComponent,
    AllTopicsComponent,
    MyTopicsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FullCalendarModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    UserService, 
    CurriculumService, 
    TopicService, 
    TechCategoryService, 
    AuthorizationService, 
    UserAdapter,
    ModuleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
