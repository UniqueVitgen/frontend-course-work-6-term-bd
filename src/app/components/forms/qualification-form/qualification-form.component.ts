import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { Validators, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { QualificationService } from '../../../services/qualification/qualification.service';

@Component({
  selector: 'app-qualification-form',
  templateUrl: './qualification-form.component.html',
  styleUrls: ['./qualification-form.component.css']
})
export class QualificationFormComponent implements OnInit, OnDestroy {
  public qualificationForm;
  public qualification = {
    name: '',
    shortName: ''
  };
  public qualificationEdit;
  sub;
  isEdit;

  constructor(public formBuilder: FormBuilder, public qualificationService: QualificationService, public router: Router,
  private route: ActivatedRoute, public bsModalRef: BsModalRef, public formEventService: FormEventService) { 
    
    this.qualificationForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      
    })
  }

  saveQualification() {
    this.qualificationService.save(this.qualification).subscribe(answer => {
      console.log('answer from save Qualification - ', answer);
      this.cancel();
    })

  }

  editQualification(qualification) {
    // console.log('edited - ', this.QualificationEdit);
    this.createQualificationEditFromQualification();
    console.log('edited - ', this.qualificationEdit);
    this.qualificationService.edit(this.qualificationEdit).subscribe(answer => {
      console.log(answer);
      this.cancel();
    })
  }

  cancel() {
    this.formEventService.hideQualificationForm.emit(true);
    this.bsModalRef.hide();
  }

  createQualificationFromEditQualification() {
    for(let property in this.qualification) {
      this.qualification[property] = this.qualificationEdit[property];
    }
  }

  createQualificationEditFromQualification() {
    for(let property in this.qualification) {
      this.qualificationEdit[property] = this.qualification[property];
    }
  }

  determineIfEdit() {
    if(this.qualificationEdit) {
      this.createQualificationFromEditQualification();
      console.log('edit - ', this.isEdit);
    }
  }

  ngOnInit() {
    this.formEventService.showQualificationForm.emit(true);
    console.log('on init');
    this.determineIfEdit();

  }
  
  ngOnDestroy(): void {
    this.formEventService.hideQualificationForm.emit(true);
  }

}
