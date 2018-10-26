import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { ModalService } from 'services/modal-service/modal.service';
// import { ModalService } from '../../../services/modal-service/modal.service';

import { SelectTeacherComponent } from '../select-teacher/select-teacher.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SelectLectorComponent } from '../../../components/select/select-lector/select-lector.component';
import { FormBuilder, Validators } from '@angular/forms';
import { DiplomWorkService } from '../../../services/diplom-work/diplom-work.service';
import { UserService } from '../../../services/user-service/user.service';
import { UserStorage } from '../../../storage/user/UserStorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-diplom',
  templateUrl: './select-diplom.component.html',
  styleUrls: ['./select-diplom.component.css']
})
export class SelectDiplomComponent implements OnInit { 
  bsModalRef: BsModalRef;

  private bodyText: string = 'hello';
  diplomWork = {
    name: '',
    student: undefined,
    leader: undefined,
    recensor: undefined,
    scienceConsultor: undefined,
    otConsultor: undefined,
    teoConsultor: undefined,
    comment: '',
  }
  selectDiplomForm;

  constructor(private modalService: BsModalService, 
    public formBuilder: FormBuilder, 
    public userStorage: UserStorage,
    private router: Router,
    public diplomWorkService: DiplomWorkService) { 
    this.selectDiplomForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      leader: ['', Validators.compose([Validators.required])],
      recensor: ['', Validators.compose([Validators.required])],
      scienceConsultor: ['', Validators.compose([Validators.required])],
      otConsultor: ['', Validators.compose([Validators.required])],
      teoConsultor: ['', Validators.compose([Validators.required])],
      comment: ['']

    });
  }

  ngOnInit() {
  } 

  selectLeader() {
    // this.template.createEmbeddedView(``)
    this.selectLector(this, 'leader');
  }

  selectLector(that, property) {
    // this.template.createEmbeddedView(``)
    let initialState = {
      onDestroy: (lector) => {
        that[property] = lector;
        that.selectDiplomForm.controls[property].setValue(that.formatFullName(lector));
        // console.log('thsi - ', this);
        this.diplomWork[property] = lector;
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

  changeComment() {
    console.log('form - ', this.selectDiplomForm);
  }

  formatFullName(lector) {
    return lector.lastname + ' ' + lector.firstname + ' ' + lector.middlename;
  }

  save() {
    this.diplomWork.student = this.userStorage.getUser();
    console.log('diplom - ', this.diplomWork);
    this.diplomWorkService.save(this.diplomWork).subscribe(res => {
      console.log('res - ', res);
      this.router.navigate(['/diplom-work', res.id]);
    })
    // this.diplomWorkService.save(this.d)
  }

}
