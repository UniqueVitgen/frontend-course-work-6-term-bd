import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DiplomWork} from '../../../../../factory/diplom-work.factory';
import {UserStorage} from '../../../../../storage/user/UserStorage';
import {UserWorker} from '../../../../../workers/UserWorker';
import {User} from '../../../../../factory/user.factory';
import {Status} from '../../../../../factory/status.factory';
import {DiplomWorkWorker} from '../../../../../workers/diplom-work.worker';

@Component({
  selector: 'app-diplom-work-card',
  templateUrl: './diplom-work-card.component.html',
  styleUrls: ['./diplom-work-card.component.css']
})
export class DiplomWorkCardComponent implements OnInit, OnChanges {
  @Input() diplomWork: DiplomWork;
  @Input() statuses: Status[];
  @Output() clickEditDiplomWorkName: EventEmitter<DiplomWork> = new EventEmitter();
  @Output() clickEditMark: EventEmitter<DiplomWork> = new EventEmitter<DiplomWork>();
  @Input() selectedStatus: Status;
  @Output() selectedStatusChange: EventEmitter<Status> = new EventEmitter();
  user: User;
  isCanChange: boolean;
  isCanChangeLikeLeader: boolean;
  isCanChangeLikeOrganization: boolean;
  isDisabledChangeDiplom: boolean;

  public get isHasMark(): boolean {
    return this.diplomWork && this.diplomWork.status && this.diplomWork.status.name === 'Завершен';
  }

  public get markText(): string {
    return (this.diplomWork.mark ? this.diplomWork.mark : '-') + '';
  }

  constructor(private userStorage: UserStorage, private userWorker: UserWorker, private diplomWorkWorker: DiplomWorkWorker) { }

  public ngOnInit(): void {
    this.user = this.userStorage.getUser();
    this.isCanChangeLikeLeader = this.userWorker.hasLectorRole(this.user);
    this.isCanChangeLikeOrganization = this.userWorker.hasOrganizerRole(this.user);
    this.isCanChange = (this.userWorker.hasOrganizerRole(this.user)
      || this.userWorker.hasStudentRole(this.user)
      || this.diplomWorkWorker.isLeader(this.diplomWork, this.user));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.isDisabledChangeDiplom = this.diplomWork.student.group.specialization.disabledEditDiplomWork;
  }

  public compareObjects(adr1, adr2): boolean {
    return adr1 && adr2 ? adr1.id === adr2.id : adr1 === adr2;
  }
  public openDiplomWorkForm(diplomWork: DiplomWork): void {
    this.clickEditDiplomWorkName.emit(diplomWork);
  }
  public changeStatus(): void {
    this.selectedStatusChange.emit(this.selectedStatus);
  }
  public editMark(): void {
    this.clickEditMark.emit(this.diplomWork);
  }

}
