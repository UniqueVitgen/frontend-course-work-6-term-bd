import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
import {BsDatepickerDirective, BsModalRef} from 'ngx-bootstrap';
import {SECEventService} from '../../../services/sec-event/secevent.service';
import {SEC} from '../../../factory/sec.factory';
import {SECEvent, SECEventForm} from '../../../factory/sec-event.factory';
import {MatCheckboxChange} from '@angular/material';
import {GroupService} from '../../../services/group/group.service';
import {Student} from '../../../factory/user.factory';
import {Group} from '../../../factory/group.factory';

@Component({
  selector: 'app-secevent-form',
  templateUrl: './secevent-form.component.html',
  styleUrls: ['./secevent-form.component.css']
})
export class SECEventFormComponent implements OnInit, OnDestroy {
  startDate;
  endDate;
  diplomWork;
  secEventForm;
  bsRangeValue: Date[];
  @ViewChild('dpe') datepickerstart: BsDatepickerDirective;
  @ViewChild('dpe') datepickerend: BsDatepickerDirective;
  dateConfig = {
    dateInputFormat: 'DD.MM.YYYY'
  };
  previous;
  next;
  minDate;
  maxDate;
  studentsToSelect: Student[];
  secEventEdit = {
    date: new Date(),
    time: new Date(),
    address: '',
    sec: undefined
  };
  onDestroy;
  percentArrayValidators;
  minTime: Date = new Date();
  maxTime: Date = new Date();
  sec: SEC;
  secEvent: SECEventForm;
  isEdit;
  dateTime = {
    date: undefined,
    endTime: undefined,
    time: undefined
  };
  onSave;

  constructor(public formBuilder: FormBuilder, public bsModalRef: BsModalRef,
              public secEventService: SECEventService, public groupService: GroupService) {
  }

  initLimitValues() {
    this.minTime = new Date(this.dateTime.date);
    this.maxTime = new Date(this.dateTime.date);
    this.minTime.setHours(8);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(20);
    this.maxTime.setMinutes(0);
  }

  initStartTime() {
    if (this.secEvent == null) {
      this.secEvent = {
        date: new Date(),
        endDate: new Date(),
        address: '',
        sec: this.sec,
        groups: []
      };
      this.dateTime.date = this.sec.startDate || new Date();
      this.dateTime.endTime = this.sec.startDate || new Date();
      this.dateTime.endTime.setHours(14, 0);
      this.dateTime.time = this.sec.startDate || new Date();
      this.dateTime.time.setHours(8, 0);
    } else {
      this.secEvent.date = new Date((this.secEvent.date as string));
      this.dateTime.date = new Date(this.secEvent.date);
      this.dateTime.time = new Date((this.secEvent.date));
      this.dateTime.time.setHours(this.secEvent.date.getHours(), this.secEvent.date.getMinutes());
      this.dateTime.endTime = new Date((this.secEvent.date));
      if (this.secEvent.endDate) {
        this.secEvent.endDate = new Date((this.secEvent.endDate as string));
        this.dateTime.endTime.setHours(this.secEvent.endDate.getHours(), this.secEvent.endDate.getMinutes());
      } else {
        this.dateTime.endTime.setHours(this.secEvent.date.getHours(), this.secEvent.date.getMinutes());
      }
    }
  }

  changeEndTimeExist(event: MatCheckboxChange) {
    this.secEvent.endDate = event.checked ? this.dateTime.endTime : null;
  }

  ngOnInit() {
    this.configFormGroup();
    this.initLimitValues();
  }

  public changeGroups(groups: Group[]): void {
    this.groupService.getAllStudentsByGroups(groups).subscribe(students => {
      this.studentsToSelect = students;
    });
  }

  configFormGroup() {
    this.initStartTime();
    this.secEventForm = this.formBuilder.group({
      address: ['', Validators.compose([Validators.required])],
      date: [undefined, Validators.compose([Validators.required])],
      time: [this.secEvent.date, Validators.compose([Validators.required])],
      endTime: [this.secEvent.endDate, Validators.compose([])],
      groups: [],
      students: []
    });
  }

  ngOnDestroy(): void {
    if (this.onDestroy) {
      this.onDestroy();
    }
  }

  changeDate() {
    setTimeout(() => {
      (this.secEvent.date as Date).setMonth((this.dateTime.date as Date).getMonth());
      (this.secEvent.date as Date).setFullYear((this.dateTime.date as Date).getFullYear());
      (this.secEvent.date as Date).setDate((this.dateTime.date as Date).getDate());
      if (this.secEvent.endDate) {
        (this.secEvent.endDate as Date).setMonth((this.dateTime.date as Date).getMonth());
        (this.secEvent.endDate as Date).setFullYear((this.dateTime.date as Date).getFullYear());
        (this.secEvent.endDate as Date).setDate((this.dateTime.date as Date).getDate());
      }
    }, 0);
  }

  changeTime() {
    (this.secEvent.date as Date).setHours((this.dateTime.time as Date).getHours());
    (this.secEvent.date as Date).setMinutes((this.dateTime.time as Date).getMinutes());
    if (this.secEvent.endDate) {
      (this.secEvent.endDate as Date).setHours((this.dateTime.endTime as Date).getHours());
      (this.secEvent.endDate as Date).setMinutes((this.dateTime.endTime as Date).getMinutes());
    }
  }

  cancel() {
    this.bsModalRef.hide();
  }

  save() {
    this.secEvent.sec = this.sec;
    this.secEventService.save(this.secEvent).subscribe(res => {
      this.onSave(res);
      this.cancel();
    });
  }

  edit() {
    this.secEvent.sec = null;
    this.secEventService.edit(this.secEvent).subscribe(res => {
      this.onSave(res);
      this.cancel();
    });
  }
}
