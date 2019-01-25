import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../factory/user.factory';
import {UserWorker} from '../../../workers/UserWorker';

@Component({
  selector: 'app-user-accordion',
  templateUrl: './user-accordion.component.html',
  styleUrls: ['./user-accordion.component.css']
})
export class UserAccordionComponent implements OnInit {
  @Input() user: User;

  constructor(private userWorker: UserWorker) { }

  ngOnInit() {
  }

  formatFullName(user) {
    return user.lastname + ' ' +  user.firstname + ' ' + user.middlename;
  }

  formatUserRole(user: User) {
    this.userWorker.formatUserRole(user);
  }

}
