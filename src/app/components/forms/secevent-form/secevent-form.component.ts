import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerDirective, BsModalRef } from 'ngx-bootstrap';
import { SECEventService } from '../../../services/sec-event/secevent.service';

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
  }
  previous;
  next;
  minDate;
  maxDate;
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
  //input
  sec;
  secEdit;
  secEvent = {
    date: new Date(),
    time: new Date(),
    address: '',
    sec: undefined
  };
  isEdit;
  dateTime = {
    date: undefined,
    time: undefined
  };
  onSave;

  constructor(public formBuilder: FormBuilder, public bsModalRef: BsModalRef, public secEventService: SECEventService ) {
    
    
  }

  initLimitValues() {
    this.minTime.setHours(8);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(20);
    this.maxTime.setMinutes(0);
  }

  initStartTime() {
    if(this.secEvent == null) {
      this.secEvent = {
        date: new Date(),
        time: new Date(),
        address: '',
        sec: this.sec
      }
    };
    this.dateTime.date = new Date();
    this.dateTime.time = new Date();
    this.dateTime.time.setHours(8,0);
    this.secEvent.time = new Date();
    this.secEvent.time.setHours(8,0);
  }

  ngOnInit() {
    // if(this.isEdit) {this.secEvent = this.secEventEdit;}
    this.configFormGroup();
    this.initLimitValues();
    console.log('secEvent', this.secEvent);
  }

  configFormGroup() {
    this.initStartTime();
    this.secEventForm = this.formBuilder.group({
      address: ['', Validators.compose([Validators.required])],
      date: [undefined, Validators.compose([Validators.required])],
      time: [this.secEvent.time, Validators.compose([Validators.required])]
    })
  }

  ngOnDestroy(): void {
    if(this.onDestroy) {
      this.onDestroy();
    }
  }

  changeDate() {
    setTimeout(() => {
      this.secEvent.date.setMonth((this.dateTime.date as Date).getMonth());
      this.secEvent.date.setFullYear((this.dateTime.date as Date).getFullYear());
      this.secEvent.date.setDate((this.dateTime.date as Date).getDate());
      console.log(this.secEvent.date);
    }, 0);
  }

  changeTime() {
    this.secEvent.date.setHours((this.dateTime.time as Date).getHours(), 
    (this.dateTime.time as Date).getMinutes());
    console.log(this.secEvent.date);
  }

  cancel() {
    this.bsModalRef.hide();
  }

  save() {
    console.log('secEvent - ',this.secEvent);
    this.secEvent.sec = this.sec;
    this.secEventService.save(this.secEvent).subscribe(res => {
      console.log('res - ', res);
      this.onSave(res);
      this.cancel();
    })
  }

  edit() {
    console.log('secEvent - ',this.secEvent);
    this.secEvent.sec = null;
    this.secEventService.edit(this.secEvent).subscribe(res => {
      console.log('res - ', res);
      this.onSave(res);
      this.cancel();
    })
  }
}
