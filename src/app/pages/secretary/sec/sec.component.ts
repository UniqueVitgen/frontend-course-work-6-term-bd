import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStorage } from '../../../storage/user/UserStorage';
import { SECService } from '../../../services/sec/sec.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SelectGroupComponent } from '../../../components/select/select-group/select-group.component';
import { SECEventFormComponent } from '../../../components/forms/secevent-form/secevent-form.component';
import { DateTimeWorker } from '../../../workers/DateTimeWorker';
import { SECEventService } from '../../../services/sec-event/secevent.service';
import { SECUserFormComponent } from '../../../components/forms/secuser-form/secuser-form.component';
import { SECUserService } from '../../../services/sec-user/secuser.service';
import { SEC } from '../../../factory/sec.factory';
import { SECDateFormComponent } from '../../../components/forms/secdate-form/secdate-form.component';
import {SelectLectorComponent} from '../../../components/select/select-lector/select-lector.component';
import {LectorService} from '../../../services/lector-service/lector.service';
import {Lector} from '../../../factory/lector.factory';
import {Subscription} from 'rxjs';
import {SelectDepartmentComponent} from '../../../components/select/select-department/select-department.component';
import {Department} from '../../../factory/department.factory';
import {SelectSpecializationComponent} from '../../../components/select/select-specialization/select-specialization.component';
import {UserWorker} from '../../../workers/UserWorker';
import {SecWorker} from '../../../workers/sec.worker';
import {SECUser, User} from '../../../factory/user.factory';
import {SECNumberFormComponent} from '../../../components/forms/secnumber-form/secnumber-form.component';
import {Group} from '../../../factory/group.factory';
import {Specialization} from '../../../factory/specialization.factory';
import {PercentageEventModel} from '../../../components/table/percentage-table/model/percentage-event.model';
import {PercentageService} from '../../../services/percentage/percentage.service';
import {PercentageFormComponent} from '../../../components/forms/percentage-form/percentage-form.component';
import {PercentageTableEventService} from '../../../components/table/percentage-table/services/percentage-table-event.service';

@Component({
  selector: 'app-sec',
  templateUrl: './sec.component.html',
  styleUrls: ['./sec.component.css']
})
export class SECComponent implements OnInit {
  sec: SEC;
  sub;
  id: number;
  user: User;
  bsModalRef: BsModalRef;
  public bsModalRefSelectGroups: BsModalRef;
  dateSaved = {
    startDate: undefined,
    endDate: undefined
  };
  isCanModify: boolean;
  targetLectors: Lector[];
  displayedColumns= ['number', 'specialization', 'amount'];
  displayedColumnsEvent= ['date', 'time', 'address', 'groups', 'students', 'edit', 'delete'];
  displayedColumnsUsers= ['lastname', 'firstname', 'middlename', 'role', 'edit', 'delete'];

  constructor(
    private route: ActivatedRoute,
    private userStorage: UserStorage,
    public userWorker: UserWorker,
    public secWorker: SecWorker,
    private cd: ChangeDetectorRef,
    private modalService: BsModalService,
    private dateTimeWorker: DateTimeWorker,
    private lectorService: LectorService,
    private percentageService: PercentageService,
    private percentageTableEventService: PercentageTableEventService,
    private secEventService: SECEventService,
    private secUserService: SECUserService,
    public secService: SECService, ) {
      const date1: Date | string = new Date();
      // console.log((date1 as Date));
      // console.log((date1 as string));
     }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = + params['id'] || 0;
        this.user = this.userStorage.getUser();
        this.getSEC((sec) => {
          this.setSEC(sec);
          this.getTargetLectors(sec);
          this.isCanModify = this.secWorker.userIsSecretaryInSec(sec, this.user) || this.userWorker.hasOrganizerRole(this.user)
          this.dateSaved.startDate = sec.startDate;
          console.log('sec ', sec);
        });
      });
  }
  public onDestroy = () => {
    this.getSEC();
  }

  setSEC(sec) {
    if (sec) {
      this.sec = sec;
      (this.sec.startDate as Date) = new Date((this.sec.startDate) as string);
      (this.sec.endDate as Date) = new Date((this.sec.endDate) as string);
    }
  }
  public isCanModifyUser(targetUser: SECUser): boolean {
    return this.isCanModify && ((!this.user || !targetUser.user) || (this.user.idPerson !== targetUser.user.idPerson));
  }

  openDateForm() {

  }


  deletePercentage(percentageEventModel: PercentageEventModel) {
    this.percentageTableEventService.deletePercentage(percentageEventModel, () => {this.getSEC()});
  }
  openPercentageForm(percentageEventModel: PercentageEventModel) {
    this.percentageTableEventService.openPercentageForm(percentageEventModel, this.sec, this.onDestroy);
  }
  openPercentageFormBefore(percentageEventModel: PercentageEventModel) {
    this.percentageTableEventService.openPercentageFormBefore(percentageEventModel, this.sec, this.onDestroy)
  }
  openPercentageFormAfter(percentageEventModel: PercentageEventModel) {
    this.percentageTableEventService.openPercentageFormAfter(percentageEventModel, this.sec, this.onDestroy);
  }
  getTargetLectors(sec: SEC): Subscription {
    if (this.sec.users && this.sec.users.length > 0) {
      return this.lectorService.getLectorsNotInSecUserIds(sec.users).subscribe(res => {
        this.targetLectors = res;
      });
    } else {
      return this.lectorService.getLectors().subscribe(res => {
        this.targetLectors = res;
      });
    }
  }
  openSECDateForm(sec?) {
    let edit;
    if (sec) {
      edit = true;
    } else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      secEdit: sec,
    };
    const modalOptions = {
      initialState: initialState,
      class: 'sec-form',
      ignoreBackdropClick: true

    };
    this.bsModalRef = this.modalService.show(SECDateFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  openSECNumberForm(sec?) {
    let edit;
    if (sec) {
      edit = true;
    } else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      objectEdit: sec,
    };
    const modalOptions = {
      initialState: initialState,
      class: 'sec-form',
      ignoreBackdropClick: true

    };
    this.bsModalRef = this.modalService.show(SECNumberFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  selectLector(that, property) {
    // this.template.createEmbeddedView(``)
    const initialState = {
      onDestroy: (lector) => {
        that[property] = lector;
        // that.selectDiplomForm.controls[property].setValue(that.formatFullName(lector));
        // console.log('thsi - ', this);
        // this.sec[property] = lector;
        // console.log(this.)
      },
      selectedLector: that[property]
    };
    const modalOptions = {
      class: 'select-lector',
      ignoreBackdropClick: true,
      initialState: initialState
    };
    this.bsModalRef = this.modalService.show(SelectLectorComponent, modalOptions);
  }

  getSEC(onSuccess?) {
    this.secService.getById(this.id).subscribe(res => {
      this.sec = res;
      this.setSEC(this.sec);
      // this.lectorStaffComponent.lectors = this.generateLectorsStaff(this.sec);
      // this.selectedStatus = this.sec.status;
      // console.log(this.lectorStaffComponent.lectors);
      if (onSuccess) {
        onSuccess(this.sec);
      }
    });

  }

  openDepartmentForm(sec?: SEC) {
    let edit;
    if (sec) {
      edit = true;
    } else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      secEdit: sec,
      sec: sec,
      onSave: (department: Department) => {
        setTimeout(() => {
          const previousDepartment = this.sec.department;
          if (previousDepartment == null || department.id !== previousDepartment.id) {
            this.sec.department = department;
            this.sec.specializations = [];
            this.sec.groups = [];
            this.cd.detectChanges();
            this.secService.edit(this.sec).subscribe(res => {
              this.setSEC(res);
              // this.sec = res;
            });
          }
        }, 200);
      }
    };
    const modalOptions = {
      initialState: initialState,
      class: 'group-form',
      ignoreBackdropClick: true

    };
    this.bsModalRefSelectGroups = this.modalService.show(SelectDepartmentComponent, modalOptions);
    this.bsModalRefSelectGroups.content.closeBtnName = 'Close';
  }

  openGroupForm(sec?) {
    let edit;
    if (sec) {
      edit = true;
    } else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      secEdit: sec,
      sec: sec,
      onSave: (groups) => {
        setTimeout(() => {
          // this.sec.groups = groups;
          this.cd.detectChanges();
          this.sec.groups = groups;
          this.secService.edit(this.sec).subscribe(res => {
            this.setSEC(res);
            // this.sec = res;
          });
        }, 200);
      }
    };
    const modalOptions = {
      initialState: initialState,
      class: 'group-form',
      ignoreBackdropClick: true

    };
    this.bsModalRefSelectGroups = this.modalService.show(SelectGroupComponent, modalOptions);
    this.bsModalRefSelectGroups.content.closeBtnName = 'Close';
  }

  openSpecializationForm(sec?) {
    let edit;
    if (sec) {
      edit = true;
    }
    else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      secEdit: sec,
      sec: sec,
      onSave: (resSpecializations) => {
        setTimeout(() => {
          this.sec.specializations = resSpecializations;
          this.sec.groups = this.sec.groups.filter((group: Group) => {
            return this.sec.specializations.filter((specialization: Specialization) => {
              return group.specialization.idSpecialization === specialization.idSpecialization;
            }).length > 0;
          });
          // this.sec.groups = groups;
          this.cd.detectChanges();
          this.secService.edit(this.sec).subscribe(res => {
            this.setSEC(res);
            // this.sec = res;
          });
        }, 200);
      }
    };
    const modalOptions = {
      initialState: initialState,
      class: 'group-form',
      ignoreBackdropClick: true

    };
    this.bsModalRefSelectGroups = this.modalService.show(SelectSpecializationComponent, modalOptions);
    this.bsModalRefSelectGroups.content.closeBtnName = 'Close';
  }

  deleteSECEvent(secEvent) {
    this.secEventService.delete(secEvent).subscribe(answer => {
      console.log('answer');
      this.getSEC();
    });
  }

  openSECEventForm(sec?, secEvent?) {
    let edit;
    if (secEvent) {
      edit = true;
    }
    else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      secEdit: sec,
      sec: sec,
      secEvent: secEvent,
      onSave: (groups) => {
        setTimeout(() => {
          this.getSEC((sec) => {
            this.setSEC(sec);
            console.log('sec ', sec);
          });
        }, 200);
      }
    };
    const modalOptions = {
      initialState: initialState,
      class: 'sec-event-form',
      ignoreBackdropClick: true

    };
    this.bsModalRefSelectGroups = this.modalService.show(SECEventFormComponent, modalOptions);
    this.bsModalRefSelectGroups.content.closeBtnName = 'Close';
  }

  openSECUserForm(sec?, secUser?) {
    this.getTargetLectors(sec).add(() => {


      let edit;
      if (secUser) {
        edit = true;
      }
      else {
        edit = false;
      }
      const initialState = {
        isEdit: edit,
        secEdit: sec,
        sec: sec,
        secUser: secUser,
        secUserEdit: secUser,
        targetLectors: this.targetLectors,
        onSave: (groups) => {
          setTimeout(() => {
            this.getSEC((sec) => {
              this.getTargetLectors(sec);
              this.setSEC(sec);
              console.log('sec onSAve', sec);
            });
          }, 200);
        },
        onDestroy: () => {
          this.getTargetLectors(sec);
        }
      };
      const modalOptions = {
        initialState: initialState,
        class: 'sec-user-form',
        ignoreBackdropClick: true
      };
      this.bsModalRefSelectGroups = this.modalService.show(SECUserFormComponent, modalOptions);
      this.bsModalRefSelectGroups.content.closeBtnName = 'Close';
    });
  }

  deleteSECUser(user) {
    this.secUserService.delete(user).subscribe(answer => {
      console.log('answer');
      this.getSEC();
    });
  }

  changeStartDate() {
    console.log('change start date');
  }

  changeEndDate() {

  }

  formatDateTime(date) {
    return this.dateTimeWorker.getDate(date, 'yyyy-MM-dd H:mm');
  }
  formatTime(date) {
    return this.dateTimeWorker.getDate(date, 'HH:mm');
  }

  formatDate(date) {
    return this.dateTimeWorker.getDate(date, 'dd.MM.yyyy');
  }

}
