import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { ModalService } from 'services/modal-service/modal.service';
// import { ModalService } from '../../../services/modal-service/modal.service';

import { SelectTeacherComponent } from '../select-teacher/select-teacher.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SelectLectorComponent } from '../../../components/select/select-lector/select-lector.component';

@Component({
  selector: 'app-select-diplom',
  templateUrl: './select-diplom.component.html',
  styleUrls: ['./select-diplom.component.css']
})
export class SelectDiplomComponent implements OnInit { 
  bsModalRef: BsModalRef;

  private bodyText: string = 'hello';

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  } 

  selectLeader(faculty?) {
    // this.template.createEmbeddedView(``)
    let modalOptions = {
      class:'select-lector',
      ignoreBackdropClick: true,
      onDestroy: (lector) => {
        console.log('thsi - ', this);
      }

    }
    this.bsModalRef = this.modalService.show(SelectLectorComponent, modalOptions);
    // let edit;
    // if(faculty) {
    //   edit = true;
    // }
    // else {
    //   edit=false;
    // }
    // let initialState = {
    //   isEdit: edit,
    //   facultyEdit: faculty,

    // };
    // this.bsModalRef = this.modalService.show(SelectLectorComponent, modalOptions);
    // this.bsModalRef.content.closeBtnName = 'Close';
  }

}
