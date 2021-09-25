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

  constructor(private userService: UserService, private curriculumService: CurriculumService) { }

  trainer: boolean;
  username: string;
  curriculums: Curriculum[];
  // modules: Module[];
  show: boolean = false;

  /**
   * Set trainer, username, and curriculums to current user logged in
   */
  ngOnInit() {
    this.trainer = this.userService.isTrainer();
    this.username = this.userService.getUsername();
    if(this.trainer) {
      this.curriculumService.getCurriculum(this.trainer).subscribe(result => this.curriculums = result);
    } else {
      this.curriculumService.getCurriculumAssociate().subscribe(result => this.curriculums = result);
    }

    // this.modules = this.userService.getModules();
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
