import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-create-curricula',
  templateUrl: './create-curricula.component.html',
  styleUrls: ['./create-curricula.component.css']
})
export class CreateCurriculaComponent implements OnInit {

  constructor(private curriculumService: CurriculumService, private router: Router) { }

  ngOnInit(): void {
  }

  newCurriculumTitle: string;
  success: boolean = false;
  failed: boolean = false;
  create() {
    this.curriculumService.createCurriculum(this.newCurriculumTitle).subscribe((result) => {
      console.log(result)
      this.success = true;
      this.failed = false;
      setTimeout(() => {
        this.router.navigateByUrl("/dashboard");
      }, 3000);
    },
    (error) => {
      console.log(error);
      this.success = false;
      this.failed = true;
    });
  }


}
