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

@Component({
  selector: 'app-diplom-work',
  templateUrl: './diplom-work.component.html',
  styleUrls: ['./diplom-work.component.css']
})
export class DiplomWorkComponent implements OnInit {
  diplomWork;
  sub;
  id;
  @ViewChild(LectorStaffComponent) lectorStaffComponent;
  bsModalRef: BsModalRef;
  bsModalRef2: BsModalRef;
  user;
  isStudent;
  isLeader;
  selectedStatus;
  displayedColumns: string[] = ['name', 'comment', 'startDate', 'endDate', 'percent', 'addBefore', 'addAfter', 'edit', 'delete'];
  userColumns: string[] = ['name', 'comment', 'startDate', 'endDate', 'percent'];
  statuses;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
     public diplomWorkService: DiplomWorkService,
     private percentageService: PercentageService,
     private userStorage: UserStorage,
     private statusService: StatusService,
     private percentagePipe: PercentPipe,
    private dateTimeWorker: DateTimeWorker) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = + params['id'] || 0;
        this.user = this.userStorage.getUser();
        this.getStatuses();
        this.getDiplomWork((diplomWork) => {
          if(diplomWork.leader.idPerson == this.user.idPerson) {
              this.isLeader = true;
          }
        })
      })
  }

  hasLectorRole(user) {
      for(let role of user.roles) {
          if(role.name == "LECTOR") {
              return true;
          }
      }
  }

  hasOrganizerRole(user) {
      for(let role of user.roles) {
          if(role.name == "ORGANIZER") {
              return true;
          }
      }
  }

  hasSecretaryRole(user) {
      for(let role of user.roles) {
          if(role.name == "SECRETARY_SEC") {
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
      let data = new Blob([res], { type: 'application/docx' });
      let file = window.URL.createObjectURL(data);
      let link = document.createElement('a');
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
          let data = new Blob([res], { type: 'application/pdf' });
          let file = window.URL.createObjectURL(data);
          let link = document.createElement('a');
          link.href = file;
          link.download = 'Дипломная работа:' + this.diplomWork.name ;
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
    });
  }

  
 
  openDiplomWorkForm(diplomWork?) {
    let edit;
    if(diplomWork) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      diplomWorkEdit: diplomWork,

    };
    let modalOptions = {
      initialState: initialState,
      class:'diplomWork-form',
      ignoreBackdropClick: true
    }
    this.bsModalRef2 = this.modalService.show(DiplomWorkTitleFormComponent, modalOptions);
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
    })
  }

  getDiplomWork(onSuccess?) {
    this.diplomWorkService.getById(this.id).subscribe(res => {
      this.diplomWork = res;
      console.log(this.diplomWork);
      this.lectorStaffComponent.isChild = true;
      // this.lectorStaffComponent.lectors = this.generateLectorsStaff(this.diplomWork);
      this.selectedStatus = this.diplomWork.status;
      console.log(this.lectorStaffComponent.lectors);
      if(onSuccess) {
        onSuccess(this.diplomWork);
      }
    })

  }

  getStatuses() {
    this.statusService.getAll().subscribe(res => {
      console.log('res', res);
      this.statuses = res;
    })
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
    if(i - 1 >= 0) {
      previous = this.diplomWork.percentages[i - 1];
    }
    if(i + 1 < this.diplomWork.percentages.length) {
      next = this.diplomWork.percentages[i + 1];
    }
    if(percentage) {
      edit = true;
      percentage.startDate = new Date(percentage.startDate);
      percentage.endDate = new Date(percentage.endDate);
    }
    else {
      edit=false;
    }
    let initialState: any = {
      isEdit: edit,
      percentageEdit: percentage,
      diplomWork: this.diplomWork,
      onDestroy: () => {
        this.getDiplomWork();
      },
      previous: previous,
      next: next,
    };
    if(percentage) {
      initialState.percentage = percentage;
    }
    let modalOptions = {
      initialState: initialState,
      class:'percentage-form',
      ignoreBackdropClick: true
    }
    // console.log('diplom work 1 - ', this.diplomWork);

    this.bsModalRef = this.modalService.show(PercentageFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
 
  openPercentageFormBefore(percentage, i) {
    let endDate = percentage.startDate;
    let edit;
    let previous, next;
    if(i - 1 >= 0) {
      previous = this.diplomWork.percentages[i - 1];
    }
    next = percentage;
    let initialState = {
      percentageEdit: percentage,
      endDate: endDate,
      diplomWork: this.diplomWork,
      onDestroy: () => {
        this.getDiplomWork();
      },
      previous: previous,
      next: next
    };
    let modalOptions = {
      initialState: initialState,
      class:'percentage-form',
      ignoreBackdropClick: true
    }
    // console.log('diplom work 1 - ', this.diplomWork);

    this.bsModalRef = this.modalService.show(PercentageFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
 
  openPercentageFormAfter(percentage, i) {
    let startDate = percentage.endDate;
    let edit;
    let previous, next;
    if(i + 1 < this.diplomWork.percentages.length) {
      next = this.diplomWork.percentages[i + 1];
    }
    previous = percentage;
    let initialState = {
      percentageEdit: percentage,
      startDate: startDate,
      diplomWork: this.diplomWork,
      onDestroy: () => {
        this.getDiplomWork();
      },
      previous: previous,
      next: next
    };
    let modalOptions = {
      initialState: initialState,
      class:'percentage-form',
      ignoreBackdropClick: true
    }
    this.bsModalRef = this.modalService.show(PercentageFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  generateLectorsStaff(diplomWork) {
    let lectors = [];
    let properties = ['leader','scienceConsultor','recensor','otConsultor','teoConsultor'];
    for(let property of properties) {
      let value = diplomWork[property];
      lectors.push(value);
    }
    let idPersons = Array.from(new Set(lectors.map((lector, index) => {return lector.idPerson})));
    let lectorsRight = [];
    for(let idPerson of idPersons) { 
      for(let lector of lectors) {
        if(lector.idPerson == idPerson) {
          lectorsRight.push(lector);
          break;
        }
      }
    }
    for(let property of properties) {
      lectorsRight.forEach(lector => {
        if(lector.idPerson == diplomWork[property].idPerson) {lector['is' + property] = true;}
      });
    }
    return lectorsRight;
  }

  onlyUnique(value, index, self) { 
    let indexOf = self.indexOf(value) === index;
    return indexOf;
  }

  formatDate(date, format?) {
    let dateObj = new Date(date);
    if(format) {
      return this.dateTimeWorker.getDate(date, format);
    }
    else {return this.dateTimeWorker.getDate(date);}
  }

}
