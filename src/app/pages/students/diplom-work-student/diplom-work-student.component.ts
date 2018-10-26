import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diplom-work-student',
  templateUrl: './diplom-work-student.component.html',
  styleUrls: ['./diplom-work-student.component.css']
})
export class DiplomWorkStudentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToSelectDiplomWork() {
    this.router.navigate(['select-diplom'])
  }

}
