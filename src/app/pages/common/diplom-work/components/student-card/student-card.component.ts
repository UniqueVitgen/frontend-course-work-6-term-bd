import {Component, Input, OnInit} from '@angular/core';
import {UserWorker} from '../../../../../workers/UserWorker';
import {Student} from '../../../../../factory/user.factory';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent implements OnInit {
  @Input() student: Student;

  constructor(public userWorker: UserWorker) { }

  ngOnInit() {
  }

}
