import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Curriculum } from 'src/app/curriculum';
import { CurriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Inject CurriculumService and UserService to bring in methods to grab needed information
  constructor(private userService: UserService, private curriculumService: CurriculumService) { }

  // A boolean determines if user logged in is trainer or associate
  trainer: boolean;
  // username of the current user logged in
  username: string;
  // curriculum of the current user logged in
  curriculums: Curriculum[];
  // boolean determines to show curriculum items or not
  show: boolean = false;

  /**
   * Calls CurriculumService functions to retrieve trainer, username, and curriculums for current user
   */
  ngOnInit() {
    this.trainer = this.userService.isTrainer();
    this.username = this.userService.getUsername();

    // subscribe to observable to set curriculums to the current user logged in
    if(this.trainer) {
      this.curriculumService.getCurriculum(this.trainer).subscribe(result => this.curriculums = result);
    } else {
      this.curriculumService.getCurriculumAssociate().subscribe(result => this.curriculums = result);
    }
  }


  /**
   * Function to switch state wheather to show 
   * the list of curriculums or not
   */
  showCurriculum() {
    if(this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
  }
  
}
