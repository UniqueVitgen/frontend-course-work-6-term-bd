import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsDaterangepickerDirective, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { TitleService } from '../../../services/title/title.service';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-title-form',
  templateUrl: './title-form.component.html',
  styleUrls: ['./title-form.component.css']
})
export class TitleFormComponent implements OnInit, OnDestroy {
  startDate;
  endDate;
  diplomWork;
  titleForm;
  title = {
    name: '',
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
  titleEdit;
  isEdit;
  onDestroy;
  percentArrayValidators;

  constructor(public formBuilder: FormBuilder, 
    private formEventService: FormEventService,
    public bsModalRef: BsModalRef, public titleService: TitleService) {


    this.configFormGroup();
  }

  ngOnInit() {
    // console.log('diplomWork - ', this.diplomWork);
    if (this.startDate) {
      this.minDate = new Date(this.startDate);
    }
    if (this.isEdit) { this.title = this.titleEdit; }
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
    console.log('form - ', this.titleForm);
  }
  configFormGroup() {
    this.titleForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])]
    })
  }

  ngOnDestroy(): void {
    this.formEventService.hideTitleForm.emit(true);
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
    console.log('title - ', this.title);
    this.titleService.save(this.title).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    })
  }

  edit() {
    console.log('title - ', this.title);
    this.titleService.edit(this.title).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    })
  }

}
