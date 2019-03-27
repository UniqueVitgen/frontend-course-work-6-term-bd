import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Percentage} from '../../../factory/percentage.factory';
import {UserWorker} from '../../../workers/UserWorker';
import {User} from '../../../factory/user.factory';
import {UserStorage} from '../../../storage/user/UserStorage';
import {DateTimeWorker} from '../../../workers/DateTimeWorker';
import {PercentageFormComponent} from '../../forms/percentage-form/percentage-form.component';
import {PercentageEventModel} from './model/percentage-event.model';

@Component({
  selector: 'app-percentage-table',
  templateUrl: './percentage-table.component.html',
  styleUrls: ['./percentage-table.component.css']
})
export class PercentageTableComponent implements OnInit {
  isCanChangeLikeLeader: boolean;
  isCanChangeLikeOrganization: boolean;
  @Input() percentages: Percentage[];
  @Output() clickEditPercentage: EventEmitter<PercentageEventModel> = new EventEmitter();
  @Output() clickDeletePercentage: EventEmitter<PercentageEventModel> = new EventEmitter();
  @Output() clickBeforePercentage: EventEmitter<PercentageEventModel> = new EventEmitter();
  @Output() clickAfterPercentage: EventEmitter<PercentageEventModel> = new EventEmitter<any>();
  public user: User;
  userColumns: string[] = ['name', 'comment', 'startDate', 'endDate', 'planPercent', 'factPercent'];
  displayedColumns: string[] = [...this.userColumns, 'addBefore', 'addAfter', 'edit', 'delete'];

  constructor(private userWorker: UserWorker, private userStorage: UserStorage, private dateTimeWorker: DateTimeWorker) { }

  ngOnInit() {
    this.user = this.userStorage.getUser();
    this.isCanChangeLikeLeader = this.userWorker.hasOrganizerRole(this.user);
    this.isCanChangeLikeOrganization = this.userWorker.hasOrganizerRole(this.user);
  }

  formatDate(date, format?) {
    const dateObj = new Date(date);
    if (format) {
      return this.dateTimeWorker.getDate(date, format);
    } else {return this.dateTimeWorker.getDate(date); }
  }



  deletePercentage(percentage, index) {
    this.clickDeletePercentage.emit({
      percentage,
      index
    });
  }

  openPercentageForm(percentage?, index?) {
    this.clickEditPercentage.emit({
      percentage,
      index
    });
  }

  openPercentageFormBefore(percentage, index) {
    this.clickBeforePercentage.emit({
      percentage,
      index
    });
  }

  openPercentageFormAfter(percentage, index) {
    this.clickAfterPercentage.emit({
      percentage,
      index
    });
  }


}
