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

@Component({
  selector: 'app-sec',
  templateUrl: './sec.component.html',
  styleUrls: ['./sec.component.css']
})
export class SECComponent implements OnInit {
  sec: SEC;
  sub;
  id;
  user;
  bsModalRef: BsModalRef;
  public bsModalRefSelectGroups: BsModalRef;
  dateSaved = {
    startDate: undefined,
    endDate: undefined
  }
  displayedColumns= ['number', 'specialization', 'amount'];
  displayedColumnsEvent= ['date', 'address', 'edit', 'delete'];
  displayedColumnsUsers= ['lastname', 'firstname', 'middlename', 'role', 'edit', 'delete'];

  constructor(
    private route: ActivatedRoute,
    private userStorage: UserStorage,
    private cd: ChangeDetectorRef,
    private modalService: BsModalService,
    private dateTimeWorker: DateTimeWorker,
    private secEventService: SECEventService,
    private secUserService: SECUserService,
    public secService: SECService,) {
      let date1 : Date | string = new Date();
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
          this.dateSaved.startDate = sec.startDate;
          console.log('sec ', sec);
        })
      })
  }

  setSEC(sec) {
    if(sec) {
      this.sec = sec;
      (this.sec.startDate as Date) = new Date((this.sec.startDate) as string);
      (this.sec.endDate as Date) = new Date((this.sec.endDate) as string);
    }
  }

  openDateForm() {

  }
 
  openSECDateForm(sec?) {
    let edit;
    if(sec) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      secEdit: sec,

    };
    let modalOptions = {
      initialState: initialState,
      class:'sec-form',
      ignoreBackdropClick: true

    }
    this.bsModalRef = this.modalService.show(SECDateFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  getSEC(onSuccess?) {
    this.secService.getById(this.id).subscribe(res => {
      this.sec = res;
      this.setSEC(this.sec);
      // this.lectorStaffComponent.lectors = this.generateLectorsStaff(this.sec);
      // this.selectedStatus = this.sec.status;
      // console.log(this.lectorStaffComponent.lectors);
      if(onSuccess) {
        onSuccess(this.sec);
      }
    })

  }
 
  openGroupForm(sec?) {
    let edit;
    if(sec) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      secEdit: sec,
      sec: sec,
      onSave: (groups) => {
        setTimeout(() => {
          this.sec.groups = groups;
          this.cd.detectChanges();
          this.secService.edit(this.sec).subscribe(res => {
            this.setSEC(res);
            // this.sec = res;
          })
        }, 200);
      }
    };
    let modalOptions = {
      initialState: initialState,
      class:'group-form',
      ignoreBackdropClick: true

    }
    this.bsModalRefSelectGroups = this.modalService.show(SelectGroupComponent, modalOptions);
    this.bsModalRefSelectGroups.content.closeBtnName = 'Close';
  }

  deleteSECEvent(secEvent) {
    this.secEventService.delete(secEvent).subscribe(answer => {
      console.log('answer');
      this.getSEC();
    })
  }
 
  openSECEventForm(sec?, secEvent?) {
    let edit;
    if(secEvent) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
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
    let modalOptions = {
      initialState: initialState,
      class:'sec-event-form',
      ignoreBackdropClick: true

    }
    this.bsModalRefSelectGroups = this.modalService.show(SECEventFormComponent, modalOptions);
    this.bsModalRefSelectGroups.content.closeBtnName = 'Close';
  }

  openSECUserForm(sec?, secUser?) {
    let edit;
    if(secUser) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      secEdit: sec,
      sec: sec,
      secUser: secUser,
      secUserEdit: secUser,
      onSave: (groups) => {
        setTimeout(() => {
          this.getSEC((sec) => {
            this.setSEC(sec);
            console.log('sec onSAve', sec);
          });
        }, 200);
      }
    };
    let modalOptions = {
      initialState: initialState,
      class:'sec-user-form',
      ignoreBackdropClick: true
    }
    this.bsModalRefSelectGroups = this.modalService.show(SECUserFormComponent, modalOptions);
    this.bsModalRefSelectGroups.content.closeBtnName = 'Close';
  }

  deleteSECUser(user) {
    this.secUserService.delete(user).subscribe(answer => {
      console.log('answer');
      this.getSEC();
    })
  }

  changeStartDate() {
    console.log('change start date');
  }

  changeEndDate() {

  }

  formatDateTime(date) {
    return this.dateTimeWorker.getDate(date, 'yyyy-MM-dd H:mm')
  }

  formatDate(date) {
    return this.dateTimeWorker.getDate(date, 'yyyy-MM-dd')
  }

}
