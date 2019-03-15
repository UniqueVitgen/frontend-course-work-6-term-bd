import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { GroupService } from '../../../services/group/group.service';
import { Group } from '../../../factory/group.factory';
import { UserStorage } from '../../../storage/user/UserStorage';
import { User } from '../../../factory/user.factory';
import { UserWorker } from '../../../workers/UserWorker';
import { Router } from '@angular/router';
import {SearchWorker} from '../../../workers/search.worker';

@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.css']
})
export class GroupTableComponent implements OnInit, OnChanges {
  @Input() groups: Group[];
  @Input() search: string;
  @Output('clickEdit') outputClickEdit: EventEmitter<Group> = new EventEmitter();
  @Output('clickDelete') outputClickDelete: EventEmitter<Group> = new EventEmitter<Group>();
  selectedGroups: Group[];
  displayedColumns= ['number', 'specialization', 'amount', 'edit', 'delete'];
  displayedColumnsUser = ['number', 'specialization', 'amount'];
  user: User;
  isAdmin: boolean;

  constructor(private userStorage: UserStorage,
    private router: Router,
    private searchWorker: SearchWorker,
    private userWorker: UserWorker) { }

  ngOnInit() {
    this.user = this.userStorage.getUser();
    this.isAdmin = this.userWorker.hasAdminRole(this.user);
  }
  ngOnChanges(): void {
    if (this.search) {
      this.selectedGroups = this.searchWorker.searchValueInsideProperty(this.search, this.groups, 'number');
    } else {
      this.selectedGroups = this.groups;
    }
  }

  goToGroupPage(group: Group) {
    this.router.navigate(['group', group.idGroup]);
  }
  clickEdit(group: Group) {
    this.outputClickEdit.emit(group);
  }
  clickDelete(group: Group) {
    this.outputClickDelete.emit(group);
  }

}
