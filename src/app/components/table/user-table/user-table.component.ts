import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {User} from '../../../factory/user.factory';
import {UserStorage} from '../../../storage/user/UserStorage';
import {UserWorker} from '../../../workers/UserWorker';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UserOrganization} from '../../../factory/table/user-organization.factory';
import {SearchWorker} from '../../../workers/search.worker';
import {SearchType} from '../../../factory/worker/SearchPropertyItem';

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
export class UserTableComponent implements OnInit, OnChanges {
  @Input() users: User[];
  @Input() search: string;
  @Output('changeUserOrganization') outputChangeUserOrganization: EventEmitter<UserOrganization> = new EventEmitter<UserOrganization>();
  selectedUsers: User[];
  displayedColumns= ['username', 'fullname', 'role',  'hasOrganizer'];
  displayedColumnsUser = ['username', 'fullname', 'role'];
  user: User;
  isAdmin: boolean;
  expandedElement: User | null;

  constructor(private userStorage: UserStorage, private userWorker: UserWorker,
              private searchWorker: SearchWorker) { }

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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.search) {
      this.selectedUsers = this.searchWorker.searchValueBySearchPropertyItem(this.search, this.users,
        [{type: SearchType.Property, value: 'username'}, {type: SearchType.Function, value: this.userWorker.formatFullName},
          {type: SearchType.Function, value: this.userWorker.formatUserRole}]);
    } else {
      this.selectedUsers = this.users;
    }
  }

}
