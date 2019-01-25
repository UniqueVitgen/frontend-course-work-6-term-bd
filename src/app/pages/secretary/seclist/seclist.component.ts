import { Component, OnInit } from '@angular/core';
import { SECFormComponent } from '../../../components/forms/secform/secform.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SECService } from '../../../services/sec/sec.service';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { Router } from '@angular/router';
import { DateTimeWorker } from '../../../workers/DateTimeWorker';
import {User} from '../../../factory/user.factory';
import {UserWorker} from '../../../workers/UserWorker';
import {UserStorage} from '../../../storage/user/UserStorage';
import {SecWorker} from '../../../workers/sec.worker';

@Component({
  selector: 'app-seclist',
  templateUrl: './seclist.component.html',
  styleUrls: ['./seclist.component.css']
})
export class SECListComponent implements OnInit {
  bsModalRef: BsModalRef;
  public secs;
  public selectedSECs;
  displayedColumns= [ 'startDate', 'endDate', 'edit', 'delete'];
  search;
  isCanAdd: boolean;
  user: User;

  constructor(public secService: SECService,
    private modalService: BsModalService,
    private userWorker: UserWorker,
    private userStorage: UserStorage,
    public secWorker: SecWorker,
    private formEventService: FormEventService,
    private dateTimeWorker: DateTimeWorker,
    public router: Router) {
  }

  getAll() {
    this.secService.getAll().subscribe(secs => {
      console.log('facs - ', secs);
      this.secs = secs;
      this.selectedSECs = secs;
    });

  }

  keyUp(event) {
    if (event.key === 'Escape') {
      this.search = '';
    }
    this.clickSearch();
  }

  clickSearch() {
    const value = this.search.toUpperCase();
    this.selectedSECs = this.secs.filter((fac) => {
      const targ = fac.name.toUpperCase();
      if (targ.indexOf(value) != -1) {
        return true;
      }
    });
  }

  trackFormSECHide() {
    this.formEventService.hideSECForm.subscribe(() => {
      this.getAll();
    });
  }

  openSECForm(sec?) {
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

    };
    const modalOptions = {
      initialState: initialState,
      class: 'sec-form',
      ignoreBackdropClick: true

    };
    this.bsModalRef = this.modalService.show(SECFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  addSEC() {
    this.router.navigate(['new-sec']);
  }

  deleteSEC(sec) {
    this.secService.delete(sec).subscribe(answer => {
      console.log('answer');
      this.getAll();
    });
  }

  ngOnInit() {
    this.getAll();
    this.trackFormSECHide();
    this.user = this.userStorage.getUser();
    this.isCanAdd = this.userWorker.hasOrganizerRole(this.user) || this.userWorker.hasAdminRole(this.user);
    setTimeout(() => {
      // this.modalService.open('1');

    }, 5000);
  }

  formatDate(date, format?) {
    const dateObj = new Date(date);
    if (format) {
      return this.dateTimeWorker.getDate(date, format);
    } else {return this.dateTimeWorker.getDate(date); }
  }

  goToSEC(sec) {
    this.router.navigate(['sec', sec.id]);
  }

}
