# **RevAssure**
### Description:
RevAssure is a web applications for designed for easy organization, 
and access, to training topics of Revature employees. Users of this 
application can be spit into one of two categories: trainer or associates. 
Associates will be able to access their calendar and view what topics 
are going to be covered on what days. Trainers will be able to create topics 
and curriculum, as well as update the calendar for their associates. Trainers
will also be able to view the topics and curriculum created by themselves or 
other users.

### Tech Stack:
- Angular 12
- NodeJS
- AWS S3
- GitHub
- JavaScript & TypeScript
- Karma & Jasmine
- HTML
- Angular Bootstrap/ Bootstrap
- FullCalendar API: https://fullcalendar.io/
- Figma

### User Stories:
- As a user I can create an account to have a Revature account
- As a user I can register as an associate or a trainer
- As a user I can sign in to my account to access my curriculum
- As a user I can access my calendar to view my schedule
- As an associate I can view what topics are going to be covered on my calendar
- As a trainer I can create a new curriculum
- As a trainer I can add topics to days in the curriculum
- As a trainer I can view topics & modules created by other trainers
- As a trainer I can create a new topic
- As a trainer I can clone someone else's topic
- As a trainer I can edit my topics
- As a trainer I can delete my topics
- As a trainer I can create a new module
- As a trainer I can edit my modules
- As a trainer I can assign topics to modules

### To-Do List
- Delete modules (may never be implemented because of design ramifications)
- Drag and drop topics in calendar
- Filter/ search for modules and topics
- Topics automatically update status based on time (Upcoming, In-progress, Completed)
- Save user session so that login isn't needed for every refresh / visit
- Input validation for registration
- Add a home page

### Getting Started
- Before you start, make sure you have Node Package Manager installed on your computer: **https://nodejs.org/en/**
- Navigate to this project directory via cmd line
- Download the project from Github and run the ```npm install``` command to download required Node modules.
- Install Angular CLI via the ```npm install @angular/cli``` command
- Run ```ng serve``` and then access the webapp via **http://localhost:4200/**

### Usage
- The usage of this app requires the RevAssure Back_End database setup, located at **https://github.com/RevAssure/P3_Backend**.
- In order to use this app with your own backend endpoints, you must change the URL stored in the RevAssureBase constant in all <em>src/environments/</em> files.
 
### Contributors:
- Jacob Brummett
- Ryan Busby
- Amit Charran
- Jintao Lin
- Victor Liu
- Lani Moon
- Jared Mullins
- Levi Neuenschwander
- Minh Thuy Nguyen
- Alex Nowak
- Douglas Ramirez
- Donald Rowell
- Matt Vasil
- Alwyn Zhang
- Christopher Zhang

### Back-end repository:
https://github.com/RevAssure/P3_Backend
### License 
https://mit-license.org/
