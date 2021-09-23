import { Component, OnInit } from '@angular/core';
import { CurriculumService } from 'src/app/services/curriculum.service';

@Component({
  selector: 'app-create-curricula',
  templateUrl: './create-curricula.component.html',
  styleUrls: ['./create-curricula.component.css']
})
export class CreateCurriculaComponent implements OnInit {

  constructor(private curriculumService: CurriculumService) { }

  ngOnInit(): void {
  }

  newCurriculumTitle: string;

  create() {
    this.curriculumService.createCurriculum(this.newCurriculumTitle);
  }


}
