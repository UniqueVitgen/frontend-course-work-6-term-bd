import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsDaterangepickerDirective, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { DegreeService } from '../../../services/degree/degree.service';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-degree-form',
  templateUrl: './degree-form.component.html',
  styleUrls: ['./degree-form.component.css']
})
export class DegreeFormComponent implements OnInit, OnDestroy {
  startDate;
  endDate;
  diplomWork;
  degreeForm;
  degree = {
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
  degreeEdit;
  isEdit;
  onDestroy;
  percentArrayValidators;

  constructor(public formBuilder: FormBuilder, 
    private formEventService: FormEventService,
    public bsModalRef: BsModalRef, public degreeService: DegreeService) {


    this.configFormGroup();
  }

  ngOnInit() {
    // console.log('diplomWork - ', this.diplomWork);
    if (this.startDate) {
      this.minDate = new Date(this.startDate);
    }
    if (this.isEdit) { this.degree = this.degreeEdit; }
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
    console.log('form - ', this.degreeForm);
  }
  configFormGroup() {
    this.degreeForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],

    })
  }

  ngOnDestroy(): void {
    this.formEventService.hideDegreeForm.emit(true);
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
    console.log('degree - ', this.degree);
    this.degreeService.save(this.degree).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    })
  }

  edit() {
    console.log('degree - ', this.degree);
    this.degreeService.edit(this.degree).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    })
  }

}
