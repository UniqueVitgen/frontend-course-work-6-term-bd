import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DiplomWorkService} from '../../../services/diplom-work/diplom-work.service';
import {DateTimeWorker} from '../../../workers/DateTimeWorker';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {UserStorage} from '../../../storage/user/UserStorage';
import {PercentPipe} from '@angular/common';
import {StatusService} from '../../../services/status/status.service';
import {DiplomWorkTitleFormComponent} from '../../../components/forms/diplom-work-title-form/diplom-work-title-form.component';
import {UserWorker} from '../../../workers/UserWorker';
import {DiplomWorkWorker} from '../../../workers/diplom-work.worker';
import {DiplomWork} from '../../../factory/diplom-work.factory';
import {DiplomWorkLectorsFormComponent} from '../../../components/forms/diplom-work-lectors-form/diplom-work-lectors-form.component';
import {User} from '../../../factory/user.factory';
import {PercentageEventModel} from '../../../components/table/percentage-table/model/percentage-event.model';
import {SECService} from '../../../services/sec/sec.service';
import {SEC} from '../../../factory/sec.factory';
import {PercentageTableEventService} from '../../../components/table/percentage-table/services/percentage-table-event.service';
import {DiplomWorkCardService} from './components/diplom-work-card/diplom-work-card.service';
import {LectorsAccordionService} from '../../../components/accordion/lectors-accordion/lectors-accordion.service';
import {generateLectorsStaff} from './utils/diplom-work.utils';
import isEmpty from 'ramda/es/isEmpty';

@Component({
  selector: 'app-diplom-work',
  templateUrl: './diplom-work.component.html',
  styleUrls: ['./diplom-work.component.css']
})
export class DiplomWorkComponent implements OnInit {
  diplomWork: DiplomWork;
  sec: SEC;
  sub;
  id: number;
  lectors: any[];
  bsModalRef: BsModalRef;
  user: User;
  isLeader: boolean;
  selectedStatus;
  statuses;
  isDisabledChangeDiplom: boolean;
  isCanChange: boolean;
  isCanChangeLikeLeader: boolean;
  isCanChangeLikeOrganization: boolean;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    public diplomWorkService: DiplomWorkService,
    public diplomWorkWorker: DiplomWorkWorker,
    public diplomWorkCardService: DiplomWorkCardService,
    public lectorsAccordionService: LectorsAccordionService,
    private secService: SECService,
    private percentageTableEventService: PercentageTableEventService,
    private userStorage: UserStorage,
    private userWorker: UserWorker,
    private statusService: StatusService) {
  }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = +params['id'] || 0;
        this.user = this.userStorage.getUser();
        this.getStatuses();
        this.getDiplomWork((diplomWork) => {
          this.isCanChange = (this.userWorker.hasOrganizerRole(this.user)
            || this.userWorker.hasStudentRole(this.user)
            || this.diplomWorkWorker.isLeader(this.diplomWork, this.user));
          this.isCanChangeLikeLeader = this.userWorker.hasLectorRole(this.user);
          this.isCanChangeLikeOrganization = this.userWorker.hasOrganizerRole(this.user);
          if (diplomWork.leader.idPerson == this.user.idPerson) {
            this.isLeader = true;
          }
          this.secService.getByDiplomId(this.diplomWork.id).subscribe(resSEC => {
            if (!isEmpty(resSEC)) {
              this.sec = resSEC;
              console.log('sec', this.sec);
            }
          });
        });
      });
  }

  saveInWord() {
    this.diplomWorkService.getWord(this.diplomWork).subscribe(res => {
      console.log('res', res);
      const data = new Blob([res], {type: 'application/docx'});
      const file = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = file;
      link.download = 'Дипломная работа:' + this.diplomWork.name + '.docx';
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  }

  saveInPDF() {
    this.diplomWorkService.getPDF(this.diplomWork).subscribe(res => {
      console.log('res', res);
      const data = new Blob([res], {type: 'application/pdf'});
      const file = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = file;
      link.download = 'Дипломная работа:' + this.diplomWork.name;
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  }

  openDiplomWorkForm(diplomWork?) {
    this.diplomWorkCardService.editTitle(diplomWork);
  }

  openDiplomWorkLectorsForm(diplomWork: DiplomWork): void {
    this.lectorsAccordionService.editDiplomLectors(diplomWork);
  }

  compareObjects(adr1, adr2) {
    return adr1 && adr2 ? adr1.id === adr2.id : adr1 === adr2;
  }

  changeStatus() {
    console.log('res', this.selectedStatus);
    this.diplomWork.status = this.selectedStatus;
    this.diplomWorkService.editByStatus(this.diplomWork, this.selectedStatus).subscribe(res => {
      Object.assign(this.diplomWork, res);
      console.log('finalyDipllomWork', this.diplomWork);
    });
  }

  getDiplomWork(onSuccess?) {
    this.diplomWorkService.getById(this.id).subscribe(res => {
      this.diplomWork = res;
      this.isDisabledChangeDiplom = this.diplomWork.student.group.specialization.disabledEditDiplomWork;
      console.log(this.diplomWork);
      this.lectors = this.generateLectorsStaff(this.diplomWork);
      console.log('lectors diplom', this.lectors);
      this.selectedStatus = this.diplomWork.status;
      if (onSuccess) {
        onSuccess(this.diplomWork);
      }
    });

  }

  getStatuses() {
    this.statusService.getAll().subscribe(res => {
      console.log('res', res);
      this.statuses = res;
    });
  }

  editMark(diplomWork: DiplomWork) {
    this.diplomWorkCardService.editMark(diplomWork);
  }

  deletePercentage(percentageEventModel: PercentageEventModel) {
    this.percentageTableEventService.deletePercentage(percentageEventModel, () => {
      this.getDiplomWork();
    });
  }

  openPercentageForm(percentageEventModel: PercentageEventModel) {
    this.percentageTableEventService.openPercentageForm(percentageEventModel, this.sec, () => {
      this.getDiplomWork();
    });
  }

  openPercentageFormBefore(percentageEventModel: PercentageEventModel) {
    this.percentageTableEventService.openPercentageFormBefore(percentageEventModel, this.sec, () => {
      this.getDiplomWork();
    });
  }

  openPercentageFormAfter(percentageEventModel: PercentageEventModel) {
    this.percentageTableEventService.openPercentageFormAfter(percentageEventModel, this.sec, () => {
      this.getDiplomWork();
    });
  }

  generateLectorsStaff(diplomWork) {
    return generateLectorsStaff(diplomWork);
  }

}
