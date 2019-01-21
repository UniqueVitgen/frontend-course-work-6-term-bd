import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Lector} from '../../../factory/lector.factory';
import {User} from '../../../factory/user.factory';
import {UserStorage} from '../../../storage/user/UserStorage';
import {Router} from '@angular/router';
import {UserWorker} from '../../../workers/UserWorker';
import {LectorWorker} from '../../../workers/lector.worker';

@Component({
  selector: 'app-lector-table',
  templateUrl: './lector-table.component.html',
  styleUrls: ['./lector-table.component.css']
})
export class LectorTableComponent implements OnInit, OnChanges {
  @Input() lectors: Lector[];
  @Output('clickEditCountOfDiplomButton') outputClickEditCountOfDiplomButton: EventEmitter<Lector> = new EventEmitter();
  @Output('clickEditButton') outputClickEditButton: EventEmitter<Lector> = new EventEmitter();
  @Output('clickDeleteButton') outputClickDeleteButton: EventEmitter<Lector> = new EventEmitter();
  displayedColumns= ['name', 'type', 'post', 'count', 'edit', 'delete'];
  displayedColumnsUser = ['name', 'type', 'post', 'count'];
  user: User;
  isAdmin: boolean;
  isOrganizer: boolean;

  constructor(private userStorage: UserStorage,
              public lectorWorker: LectorWorker,
              private router: Router,
              private userWorker: UserWorker) { }

  ngOnInit() {
    this.user = this.userStorage.getUser();
    this.isAdmin = this.userWorker.hasAdminRole(this.user);
    this.isOrganizer = this.userWorker.hasOrganizerRole(this.user);
  }
  ngOnChanges(): void {

  }

  goToLectorPage(lector: Lector) {
    this.router.navigate(['lector', lector.idPerson])
  }
  clickEditButton(lector: Lector) {
    this.outputClickEditButton.emit(lector);
  }
  clickDeleteButton(lector: Lector) {
    this.outputClickDeleteButton.emit(lector);
  }
  clickEditCountOfDiplomButton(lector: Lector) {
    this.outputClickEditCountOfDiplomButton.emit(lector);
  }

}
