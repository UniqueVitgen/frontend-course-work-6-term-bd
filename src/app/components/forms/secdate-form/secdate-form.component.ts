import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BsDatepickerDirective, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DateTimeWorker } from '../../../workers/DateTimeWorker';
import { SECService } from '../../../services/sec/sec.service';
import { SelectGroupComponent } from '../../select/select-group/select-group.component';
import { SECEventFormComponent } from '../secevent-form/secevent-form.component';

@Component({
  selector: 'app-secdate-form',
  templateUrl: './secdate-form.component.html',
  styleUrls: ['./secdate-form.component.css']
})
export class SECDateFormComponent implements OnInit {
  startDate;
  endDate;
  diplomWork;
  secForm;
  sec = {
    groups: []
  }
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
  secEdit;
  isEdit;
  onDestroy;
  percentArrayValidators;
  displayedColumns= ['number', 'specialization', 'amount'];
  displayedColumnsEvent= ['startDate', 'endDate', 'address'];
  public bsModalRefSelectGroups: BsModalRef

  constructor(public formBuilder: FormBuilder, 
    private formEventService: FormEventService,
    private modalService: BsModalService,
    private cd:ChangeDetectorRef,
    private dateTimeWorker: DateTimeWorker,
    public bsModalRef: BsModalRef, public secService: SECService) {


    this.configFormGroup();
  }

  ngOnInit() {
    // console.log('diplomWork - ', this.diplomWork);
    if (this.startDate) {
      this.minDate = new Date(this.startDate);
    }
    if (this.isEdit) { this.sec = this.secEdit; }
    setTimeout(() => {
      this.configPercentValidation();
    }, 200);
  }

  configPercentValidation() {
    let validators = [];
    if (this.previous) {
      validators.push(Validators.min(Number(this.previous.percent) + 1));
    }
    if (this.next) {
      validators.push(Validators.max(Number(this.next.percent) - 1));
    }
    this.percentArrayValidators = validators;
    console.log('form - ', this.secForm);
  }
  configFormGroup() {
    this.secForm = this.formBuilder.group({
      startDate: [undefined, Validators.compose([Validators.required])],
      endDate: [undefined, Validators.compose([Validators.required])],

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
          console.log('sec', this.sec);
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
      // onSave: (groups) => {
      //   setTimeout(() => {
      //     this.sec.groups = groups;
      //     this.cd.detectChanges();
      //     console.log('sec', this.sec);
      //   }, 200);
      // }
    };
    let modalOptions = {
      initialState: initialState,
      class:'sec-event-form',
      ignoreBackdropClick: true

    }
    this.bsModalRefSelectGroups = this.modalService.show(SECEventFormComponent, modalOptions);
    this.bsModalRefSelectGroups.content.closeBtnName = 'Close';
  }

  ngOnDestroy(): void {
    this.formEventService.hideSECForm.emit(true);
    if (this.onDestroy) {
      this.onDestroy();
    }
  }

  changeStartDate() {
    console.log('change start date');
  }

  changeEndDate() {

  }

  cancel() {
    this.bsModalRef.hide();
  }

  save() {
    console.log('sec - ', this.sec);
    this.secService.save(this.sec).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    })
  }

  edit() {
    console.log('sec - ', this.sec);
    this.secService.edit(this.sec).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    })
  }

  formatDate(date, format?) {
    let dateObj = new Date(date);
    if(format) {
      return this.dateTimeWorker.getDate(date, format);
    }
    else {return this.dateTimeWorker.getDate(date);}
  }

}
