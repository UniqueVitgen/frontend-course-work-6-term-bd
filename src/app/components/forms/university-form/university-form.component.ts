import { Component, OnInit } from '@angular/core';
import { University } from '../../../factory/university.factory';
import { FormBuilder, Validators } from '@angular/forms';
import { UniversityService } from '../../../services/university/university.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-university-form',
  templateUrl: './university-form.component.html',
  styleUrls: ['./university-form.component.css']
})
export class UniversityFormComponent implements OnInit {
  public universityForm;
  public university: University = {name: '', shortName: ''};
  public universityEdit;
  sub;
  isEdit;

  constructor(public formBuilder: FormBuilder, public universityService: UniversityService, public router: Router,
  private route: ActivatedRoute, public bsModalRef: BsModalRef, public formEventService: FormEventService) { 
    
    this.universityForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      shortName: ['', Validators.compose([])]
    })
  }

  saveUniversity() {
    this.universityService.save(this.university).subscribe(answer => {
      console.log('answer from save University - ', answer);
      this.cancel();
    })

  }

  compareFaculties(c1, c2): boolean {
    if(c1 && c2) {
      return c1 && c2 ? c1.idFaculty === c2.idFaculty : c1 === c2;
    }
  }  

  editUniversity(university) {
    // console.log('edited - ', this.UniversityEdit);
    this.createUniversityEditFromUniversity();
    console.log('edited - ', this.universityEdit);
    this.universityService.edit(this.universityEdit).subscribe(answer => {
      console.log(answer);
      this.cancel();
    })
  }

  cancel() {
    this.formEventService.hideUniversityForm.emit(true);
    this.bsModalRef.hide();
  }

  createUniversityFromEditUniversity() {
    for(let property in this.university) {
      this.university[property] = this.universityEdit[property];
    }
  }

  createUniversityEditFromUniversity() {
    for(let property in this.university) {
      this.universityEdit[property] = this.university[property];
    }
  }

  determineIfEdit() {
    if(this.universityEdit) {
      this.createUniversityFromEditUniversity();
      console.log('edit - ', this.isEdit);
    }
  }

  ngOnInit() {
    this.formEventService.showUniversityForm.emit(true);
    console.log('on init');
    console.log(this.universityEdit);
    this.determineIfEdit();

  }
  
  ngOnDestroy(): void {
    this.formEventService.hideUniversityForm.emit(true);
  }

}
