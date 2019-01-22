import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SpecializationService} from '../../../services/specialization/specialization.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ArrayWorker} from '../../../workers/ArrayWorker';
import {FormEventService} from '../../../services/events/form/form-event.service';
import {SEC} from '../../../factory/sec.factory';
import {Specialization} from '../../../factory/specialization.factory';

@Component({
  selector: 'app-select-specialization',
  templateUrl: './select-specialization.component.html',
  styleUrls: ['./select-specialization.component.css']
})
export class SelectSpecializationComponent implements OnInit, OnDestroy {
  public secEdit: SEC;
  sub;
  isEdit: boolean;
  displayedColumns= ['name', 'shortName', 'faculty', 'selected'];
  public specializations: Specialization[];
  public selectedSpecializations: Specialization[];
  public targetSpecializations: Specialization[] = [];
  sec: SEC;
  onSave;

  constructor(public formBuilder: FormBuilder, public specializationService: SpecializationService, public router: Router,
              private route: ActivatedRoute, public bsModalRef: BsModalRef,
              private modalService: BsModalService,
              private arrayWorker: ArrayWorker, public formEventService: FormEventService) {

  }

  getAll() {
    // if(this.sec && this.sec.id) {
    //   this.specializationService.findAllBySecInOrNull([this.sec]).subscribe(specializations => {
    //     console.log('specializations - ', specializations);
    //     this.specializations = specializations;
    //     this.selectedSpecializations = specializations;
    //     this.targetSpecializations = this.secEdit.specializations.slice();
    //   })
    // }
    // else {
    //   this.specializationService.findAllBySecIsNull().subscribe(specializations => {
    //     console.log('specializations - ', specializations);
    //   })
    // }
    if (this.sec) {
      this.specializationService.getByDepartment(this.sec.department.id).subscribe(resSpecializations => {
        this.specializations = resSpecializations;
        this.selectedSpecializations = resSpecializations;
        this.targetSpecializations = this.secEdit.specializations.slice();
      });
    }
  }

  cancel() {
    this.bsModalRef.hide();
  }

  compareSpecializations(c1, c2): boolean {
    if (c1 && c2) {
      return c1 && c2 ? c1.idSpecialization === c2.idSpecialization : c1 === c2;
    }
  }

  createSpecializationFromEditSpecialization() {
    for (const property in this.sec) {
      this.sec[property] = this.secEdit[property];
    }
  }

  createSpecializationEditFromSpecialization() {
    for (const property in this.sec) {
      this.secEdit[property] = this.sec[property];
    }
  }

  ngOnInit() {
    this.formEventService.showSpecializationForm.emit(true);
    console.log('on init');
    this.secEdit = Object.assign({}, this.sec);
    this.getAll();
  }

  ngOnDestroy(): void {
  }

  selectSpecialization(specialization) {
    if (!this.arrayWorker.containtsByProperty(this.targetSpecializations, specialization, 'idSpecialization')) {
      this.targetSpecializations.push(specialization);
    } else {
      const index = this.arrayWorker.indexOfByProperty(this.targetSpecializations, specialization, 'idSpecialization');
      if (index > -1) {
        this.targetSpecializations.splice(index, 1);
      }
    }
    // if(specialization.selected) {
    //   this.targetSpecializations.push(specialization);
    // }
    // else {
    //   var index = this.targetSpecializations.indexOf(specialization);
    //   if (index > -1) {
    //     this.targetSpecializations.splice(index, 1);
    //   }
    // }
    console.log(this.targetSpecializations);
    console.log(this.sec);
  }

  selectSpecializations() {
    // this.sec.specializations = this.targetSpecializations;
    this.cancel();
    this.onSave(this.targetSpecializations);
  }

}
