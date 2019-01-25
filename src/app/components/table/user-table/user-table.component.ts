import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../factory/user.factory';
import {UserStorage} from '../../../storage/user/UserStorage';
import {UserWorker} from '../../../workers/UserWorker';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UserOrganization} from '../../../factory/table/user-organization.factory';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  animations: [
  trigger('detailExpand', [
    state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ]),
]
})
export class UserTableComponent implements OnInit {
  @Input() users: User[];
  @Output('changeUserOrganization') outputChangeUserOrganization: EventEmitter<UserOrganization> = new EventEmitter<UserOrganization>();
  displayedColumns= ['username', 'fullname', 'role',  'hasOrganizer'];
  displayedColumnsUser = ['username', 'fullname', 'role'];
  user: User;
  isAdmin: boolean;
  expandedElement: User | null;

  constructor(private userStorage: UserStorage, private userWorker: UserWorker) { }

  ngOnInit() {
    this.user = this.userStorage.getUser();
    this.isAdmin = this.userWorker.hasAdminRole(this.user);
  }
  changeUserOrganization(user: User, isOrganizer: boolean) {
    this.outputChangeUserOrganization.emit({
      user: user,
      isOrganization: isOrganizer
    });
  }

}
