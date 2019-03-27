import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserTableComponent} from '../user-table/user-table.component';
import {UserStorage} from '../../../storage/user/UserStorage';
import {UserWorker} from '../../../workers/UserWorker';
import {SearchWorker} from '../../../workers/search.worker';
import {SearchType} from '../../../factory/worker/SearchPropertyItem';
import {animate, state, style, transition, trigger} from '@angular/animations';

// TODO: add base component for person table
@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    ]
})
export class StudentTableComponent extends UserTableComponent implements OnInit, OnChanges {
  displayedColumns= ['username', 'fullname'];
  displayedColumnsUser = ['username', 'fullname', 'group', 'diplom'];

  constructor(protected userStorage: UserStorage, protected userWorker: UserWorker,
              protected searchWorker: SearchWorker) {
    super(userStorage, userWorker, searchWorker);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    super.ngOnChanges(changes);
  }

}
