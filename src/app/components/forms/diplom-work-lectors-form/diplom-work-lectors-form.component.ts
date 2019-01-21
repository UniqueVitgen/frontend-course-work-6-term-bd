import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BsDatepickerDirective, BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormEventService} from '../../../services/events/form/form-event.service';
import {DiplomWorkService} from '../../../services/diplom-work/diplom-work.service';
import {DiplomWork} from '../../../factory/diplom-work.factory';
import {UserWorker} from '../../../workers/UserWorker';
import {SelectLectorComponent} from '../../select/select-lector/select-lector.component';

@Component({
  selector: 'app-diplom-work-lectors-form',
  templateUrl: './diplom-work-lectors-form.component.html',
  styleUrls: ['./diplom-work-lectors-form.component.css']
})
export class DiplomWorkLectorsFormComponent implements OnInit, OnDestroy {
  startDate;
  endDate;
  diplomWorkForm: FormGroup;
  diplomWork: DiplomWork;
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
  diplomWorkEdit: DiplomWork;
  isEdit;
  onDestroy;
  percentArrayValidators;

  constructor(public formBuilder: FormBuilder,
              private formEventService: FormEventService,
              public userWorker: UserWorker,
              private modalService: BsModalService,
              public bsModalRef: BsModalRef, public diplomWorkService: DiplomWorkService) {


  }

  ngOnInit() {
    this.configFormGroup(this.diplomWorkEdit);
    // console.log('diplomWork - ', this.diplomWork);
    if (this.startDate) {
      this.minDate = new Date(this.startDate);
    }
    if (this.isEdit) { this.diplomWork = this.diplomWorkEdit; }
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
    console.log('form - ', this.diplomWorkForm);
  }
  configFormGroup(diplomWork: DiplomWork) {
    this.diplomWorkForm = this.formBuilder.group({
      leader: [this.userWorker.formatFullName(diplomWork.leader), Validators.compose([Validators.required])],
      recensor: [this.userWorker.formatFullName(diplomWork.recensor)],
      scienceConsultor: [this.userWorker.formatFullName(diplomWork.scienceConsultor)],
      otConsultor: [this.userWorker.formatFullName(diplomWork.otConsultor)],
      teoConsultor: [this.userWorker.formatFullName(diplomWork.teoConsultor)]
    });
  }

  selectLeader() {
    // this.template.createEmbeddedView(``)
    this.selectLector(this, 'leader');
  }

  selectLector(that, property) {
    // this.template.createEmbeddedView(``)
    let initialState = {
      onDestroy: (lector) => {
        // that[property] = lector;
        that.diplomWorkForm.controls[property].setValue(that.userWorker.formatFullName(lector));
        // console.log('thsi - ', this);
        that.diplomWork[property] = lector;
        // console.log(this.)
      },
      selectedLector: that[property]
    }
    let modalOptions = {
      class:'select-lector',
      ignoreBackdropClick: true,
      initialState: initialState
    }
    this.bsModalRef = this.modalService.show(SelectLectorComponent, modalOptions);
  }

  selectRecensor() {
    this.selectLector(this, "recensor");
  }

  selectScienceConsultor() {
    this.selectLector(this, "scienceConsultor");
  }

  selectOtConsultor() {
    this.selectLector(this, "otConsultor");
  }

  selectTeoConsultor() {
    this.selectLector(this, "teoConsultor");
  }

  ngOnDestroy(): void {
    this.formEventService.hideDiplomWorkForm.emit(true);
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

  edit() {
    console.log('diplomWork - ', this.diplomWork);
    this.diplomWorkService.edit(this.diplomWork).subscribe(res => {
      console.log('res - ', res);
      this.cancel();
    });
  }

}
