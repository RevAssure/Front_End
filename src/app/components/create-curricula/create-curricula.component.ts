import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurriculumService } from 'src/app/services/curriculum.service';

/**
 * This component display a form for trainers to create a curricula
 */
@Component({
  selector: 'app-create-curricula',
  templateUrl: './create-curricula.component.html',
  styleUrls: ['./create-curricula.component.css']
})
export class CreateCurriculaComponent implements OnInit {

  // Inject required modules and service
  constructor(private curriculumService: CurriculumService, private router: Router) { }

  ngOnInit(): void {
  }

  // title of the new curriculum
  newCurriculumTitle: string;
  // boolean states operation is success
  success: boolean = false;
    // boolean states operation failed
  failed: boolean = false;

  /**
   * Calls CurriculumService function to insert curriculum into database.
   * Routes back to Dashboard view afterwards.
   */
  create() {
    this.curriculumService.createCurriculum(this.newCurriculumTitle).subscribe((result) => {
      this.success = true;
      this.failed = false;
      // Redirect back to dashboard after successful created curricula after 3 seconds
      setTimeout(() => {
        this.router.navigateByUrl("/dashboard");
      }, 3000);
    },
    // perform below code when an error occur
    (error) => {
      console.log(error);
      this.success = false;
      this.failed = true;
    });
  }


}
