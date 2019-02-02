import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiplomWorkService } from '../../../services/diplom-work/diplom-work.service';
import { DateTimeWorker } from '../../../workers/DateTimeWorker';
import { LectorStaffComponent } from '../../students/lector-staff/lector-staff.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PercentageFormComponent } from '../../../components/forms/percentage-form/percentage-form.component';
import { UserStorage } from '../../../storage/user/UserStorage';
import { PercentageService } from '../../../services/percentage/percentage.service';
import { PercentPipe } from '@angular/common';
import { StatusService } from '../../../services/status/status.service';
import { DiplomWorkTitleFormComponent } from '../../../components/forms/diplom-work-title-form/diplom-work-title-form.component';
import { UserWorker } from '../../../workers/UserWorker';
import {DiplomWorkWorker} from '../../../workers/diplom-work.worker';
import {DiplomWork} from '../../../factory/diplom-work.factory';
import {DiplomWorkLectorsFormComponent} from '../../../components/forms/diplom-work-lectors-form/diplom-work-lectors-form.component';
import {User} from '../../../factory/user.factory';

@Component({
  selector: 'app-diplom-work',
  templateUrl: './diplom-work.component.html',
  styleUrls: ['./diplom-work.component.css']
})
export class DiplomWorkComponent implements OnInit {
  diplomWork: DiplomWork;
  sub;
  id: number;
  @ViewChild(LectorStaffComponent) lectorStaffComponent;
  bsModalRef: BsModalRef;
  bsModalRef2: BsModalRef;
  user: User;
  isStudent: boolean;
  isLeader: boolean;
  selectedStatus;
  displayedColumns: string[] = ['name', 'comment', 'startDate', 'endDate', 'percent', 'addBefore', 'addAfter', 'edit', 'delete'];
  userColumns: string[] = ['name', 'comment', 'startDate', 'endDate', 'percent'];
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
     private percentageService: PercentageService,
     private userStorage: UserStorage,
     private userWorker: UserWorker,
     private statusService: StatusService,
     private percentagePipe: PercentPipe,
    private dateTimeWorker: DateTimeWorker) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = + params['id'] || 0;
        this.user = this.userStorage.getUser();;
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
        });
      });
  }

  hasLectorRole(user) {
      for (const role of user.roles) {
          if (role.name == 'LECTOR') {
              return true;
          }
      }
  }

  hasOrganizerRole(user) {
      for (const role of user.roles) {
          if (role.name == 'ORGANIZER') {
              return true;
          }
      }
  }

  hasSecretaryRole(user) {
      for (const role of user.roles) {
          if (role.name == 'SECRETARY_SEC') {
              return true;
          }
      }
  }

  isUserHasAdvancedPermitPercentages(user) {
    return this.hasLectorRole(user) || this.hasSecretaryRole(user);
  }

  saveInWord() {
    this.diplomWorkService.getWord(this.diplomWork).subscribe(res => {
      console.log('res', res);
      const data = new Blob([res], { type: 'application/docx' });
      const file = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = file;
      link.download = 'Дипломная работа:' + this.diplomWork.name + '.docx';
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  }

  // saveInPDF() {
  //   this.diplomWorkService.getPDF(this.diplomWork).subscribe(res => {
  //     console.log('res', res);
  //     let data = new Blob([res], { type: 'application/docx' });
  //     let file = window.URL.createObjectURL(data);
  //     let link = document.createElement('a');
  //     link.href = file;
  //     link.download = 'Дипломная работа:' + this.diplomWork.name + '.docx';
  //     document.body.appendChild(link);
  //     link.click();
  //     link.parentNode.removeChild(link);
  //   });
  // }

  saveInPDF() {
    this.diplomWorkService.getPDF(this.diplomWork).subscribe(res => {
      console.log('res', res);
          const data = new Blob([res], { type: 'application/pdf' });
          const file = window.URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = file;
          link.download = 'Дипломная работа:' + this.diplomWork.name ;
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
    });
  }

  openDiplomWorkForm(diplomWork?) {
    let edit;
    if (diplomWork) {
      edit = true;
    }
    else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      diplomWorkEdit: diplomWork,

    };
    const modalOptions = {
      initialState: initialState,
      class: 'diplomWork-form',
      ignoreBackdropClick: true
    };
    this.bsModalRef2 = this.modalService.show(DiplomWorkTitleFormComponent, modalOptions);
    this.bsModalRef2.content.closeBtnName = 'Close';
  }
  openDiplomWorkLectorsForm(diplomWork: DiplomWork): void {
    let edit;
    if (diplomWork) {
      edit = true;
    } else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      diplomWorkEdit: diplomWork,
    };
    const modalOptions = {
      initialState: initialState,
      class: 'diplomWork-form',
      ignoreBackdropClick: true
    };
    this.bsModalRef2 = this.modalService.show(DiplomWorkLectorsFormComponent, modalOptions);
    this.bsModalRef2.content.closeBtnName = 'Close';
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
      this.lectorStaffComponent.isChild = true;
      // this.lectorStaffComponent.lectors = this.generateLectorsStaff(this.diplomWork);
      this.selectedStatus = this.diplomWork.status;
      console.log(this.lectorStaffComponent.lectors);
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

  deletePercentage(percentage) {
    this.percentageService.delete(percentage).subscribe(data => {
      console.log(data);
      this.getDiplomWork();
    });
  }

  openPercentageForm(percentage?, i?) {
    let edit;
    let previous, next;
    if (i - 1 >= 0) {
      previous = this.diplomWork.percentages[i - 1];
    }
    if (i + 1 < this.diplomWork.percentages.length) {
      next = this.diplomWork.percentages[i + 1];
    }
    if (percentage) {
      edit = true;
      percentage.startDate = new Date(percentage.startDate);
      percentage.endDate = new Date(percentage.endDate);
    } else {
      edit = false;
    }
    const initialState: any = {
      isEdit: edit,
      percentageEdit: percentage,
      diplomWork: this.diplomWork,
      onDestroy: () => {
        this.getDiplomWork();
      },
      previous: previous,
      next: next,
    };
    if (percentage) {
      initialState.percentage = percentage;
    }
    const modalOptions = {
      initialState: initialState,
      class: 'percentage-form',
      ignoreBackdropClick: true
    };
    // console.log('diplom work 1 - ', this.diplomWork);

    this.bsModalRef = this.modalService.show(PercentageFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openPercentageFormBefore(percentage, i) {
    const endDate = percentage.startDate;
    let edit;
    let previous, next;
    if (i - 1 >= 0) {
      previous = this.diplomWork.percentages[i - 1];
    }
    next = percentage;
    const initialState = {
      percentageEdit: percentage,
      endDate: endDate,
      diplomWork: this.diplomWork,
      onDestroy: () => {
        this.getDiplomWork();
      },
      previous: previous,
      next: next
    };
    const modalOptions = {
      initialState: initialState,
      class: 'percentage-form',
      ignoreBackdropClick: true
    };
    // console.log('diplom work 1 - ', this.diplomWork);

    this.bsModalRef = this.modalService.show(PercentageFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openPercentageFormAfter(percentage, i) {
    const startDate = percentage.endDate;
    let edit;
    let previous, next;
    if (i + 1 < this.diplomWork.percentages.length) {
      next = this.diplomWork.percentages[i + 1];
    }
    previous = percentage;
    const initialState = {
      percentageEdit: percentage,
      startDate: startDate,
      diplomWork: this.diplomWork,
      onDestroy: () => {
        this.getDiplomWork();
      },
      previous: previous,
      next: next
    };
    const modalOptions = {
      initialState: initialState,
      class: 'percentage-form',
      ignoreBackdropClick: true
    };
    this.bsModalRef = this.modalService.show(PercentageFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  generateLectorsStaff(diplomWork) {
    const lectors = [];
    const properties = ['leader', 'scienceConsultor', 'recensor', 'otConsultor', 'teoConsultor'];
    for (const property of properties) {
      const value = diplomWork[property];
      lectors.push(value);
    }
    const idPersons = Array.from(new Set(lectors.map((lector, index) => lector.idPerson)));
    const lectorsRight = [];
    for (const idPerson of idPersons) {
      for (const lector of lectors) {
        if (lector.idPerson == idPerson) {
          lectorsRight.push(lector);
          break;
        }
      }
    }
    for (const property of properties) {
      lectorsRight.forEach(lector => {
        if (lector.idPerson == diplomWork[property].idPerson) {lector['is' + property] = true; }
      });
    }
    return lectorsRight;
  }

  onlyUnique(value, index, self) {
    const indexOf = self.indexOf(value) === index;
    return indexOf;
  }

  formatDate(date, format?) {
    const dateObj = new Date(date);
    if (format) {
      return this.dateTimeWorker.getDate(date, format);
    }
    else {return this.dateTimeWorker.getDate(date); }
  }

}
