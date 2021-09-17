import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { DayViewComponent } from './components/day-view/day-view.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModulesComponent } from './components/modules/modules.component';
import { CreateModuleComponent } from './components/create-module/create-module.component';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';
import { TopicComponent } from './components/topic/topic.component';

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
    DayViewComponent,
    DashboardComponent,
    ModulesComponent,
    CreateModuleComponent,
    CreateTopicComponent,
    TopicComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
