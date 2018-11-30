import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../factory/user.factory';

@Component({
  selector: 'app-user-accordion',
  templateUrl: './user-accordion.component.html',
  styleUrls: ['./user-accordion.component.css']
})
export class UserAccordionComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

  formatFullName(user) {
    return user.lastname + ' ' +  user.firstname + ' ' + user.middlename;
  }

  formatUserRole(user) {
    return user.roles[0].name;
  }

}
