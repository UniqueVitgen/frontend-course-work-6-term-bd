import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GroupService } from '../../../services/group/group.service';
import { Group } from '../../../factory/group.factory';
import { UserStorage } from '../../../storage/user/UserStorage';
import { User } from '../../../factory/user.factory';
import { UserWorker } from '../../../workers/UserWorker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.css']
})
export class GroupTableComponent implements OnInit, OnChanges {
  @Input() groups: Group[];
  displayedColumns= ['number', 'specialization', 'amount', 'edit', 'delete'];
  displayedColumnsUser = ['number', 'specialization', 'amount'];
  user: User;
  isAdmin: boolean;

  constructor(private userStorage: UserStorage,
    private router: Router,
    private userWorker: UserWorker) { }

  ngOnInit() {
    this.user = this.userStorage.getUser();
    this.isAdmin = this.userWorker.hasAdminRole(this.user);
  }
  ngOnChanges(): void {

  }

  goToGroupPage(group: Group) {
    this.router.navigate(['group', group.idGroup])
  }

}
