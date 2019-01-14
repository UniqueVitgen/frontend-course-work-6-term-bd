import { Component, OnInit, ViewChild } from '@angular/core';

import { DegreeFormComponent } from '../../../components/forms/degree-form/degree-form.component';

import { PasswordValidator } from '../../../validators/password.validator';
import { DegreeService } from '../../../services/degree/degree.service';
import { Router } from '@angular/router';
import { BsModalComponent } from 'ng2-bs3-modal';
import { ModalService } from '../../../services/modal-service/modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-degree-admin',
  templateUrl: './degree-admin.component.html',
  styleUrls: ['./degree-admin.component.css']
})
export class DegreeAdminComponent implements OnInit {
  bsModalRef: BsModalRef;
  public degrees;
  public selectedDegrees;
  displayedColumns= ['name', 'edit', 'delete']
  search;

  constructor(public degreeService: DegreeService,
    private modalService: BsModalService,
    private formEventService: FormEventService,
    public router: Router,) {
  }

  getAll() {
    this.degreeService.getAll().subscribe(degrees => {
      console.log('facs - ', degrees);
      this.degrees = degrees;
      this.selectedDegrees = degrees;
    })

  }

  keyUp(event) {
    if (event.key === 'Escape') {
      this.search = '';
    }
    this.clickSearch();
  }

  clickSearch() {
    let value = this.search.toUpperCase();
    this.selectedDegrees = this.degrees.filter((fac) => {
      let targ = fac.name.toUpperCase();
      if(targ.indexOf(value) != -1) {
        return true;
      } 
    })
  }

  trackFormDegreeHide() {
    this.formEventService.hideDegreeForm.subscribe(()=> {
      this.getAll();
    })
  }
 
  openDegreeForm(degree?) {
    let edit;
    if(degree) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      degreeEdit: degree,

    };
    let modalOptions = {
      initialState: initialState,
      class:'degree-form',
      ignoreBackdropClick: true

    }
    this.bsModalRef = this.modalService.show(DegreeFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  // openModal(id: string) {
  //   this.modalService.open(id);
  // }

  // closeModal(id: string) {
  //   this.modalService.close(id);
  // }

  addDegree() {
    this.router.navigate(['new-degree'])
  }

  // closeModal() {
  //   console.log('inner');
  //   try {
  //     this.modal.close().then(answer => {
  //       console.log('close1 - ', answer);
  //     }).catch(err => {
  //       console.log('close1 err - ', err);
  //     });;
  //     this.modal.dismiss().then(answer => {
  //       console.log('close2 - ', answer);
  //     }).catch(err => {
  //       console.log('close2 err - ', err);
  //     });
  //   }
  //   catch (err) {
  //     console.log('err - ', err);
  //   }
  // }

  deleteDegree(degree) {
    this.degreeService.delete(degree).subscribe(answer => {
      console.log('answer');
      this.getAll();
    })
  }

  ngOnInit() {
    this.getAll();
    this.trackFormDegreeHide();
    setTimeout(() => {
      // this.modalService.open('1');

    }, 5000);
  }

}

