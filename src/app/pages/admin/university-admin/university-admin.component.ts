import { Component, OnInit } from '@angular/core';
import { University } from '../../../factory/university.factory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UniversityService } from '../../../services/university/university.service';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { UniversityFormComponent } from '../../../components/forms/university-form/university-form.component';

@Component({
  selector: 'app-university-admin',
  templateUrl: './university-admin.component.html',
  styleUrls: ['./university-admin.component.css']
})
export class UniversityAdminComponent implements OnInit {
  universities: University[];
  searchValue: string;
  bsModalRef: BsModalRef;

  constructor(private universityService: UniversityService,
    private formEventService: FormEventService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getUniversities();
    this.trackUniversities();
  }

  getUniversities() {
    this.universityService.getAll().subscribe(resUniversities => {
      this.universities = resUniversities;
    })
  }
 
  openUniversityForm(university?: University) {
    let edit;
    if(university) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      universityEdit: university,

    };
    let modalOptions = {
      initialState: initialState,
      class:'university-form',
      ignoreBackdropClick: true
    }
    this.bsModalRef = this.modalService.show(UniversityFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  changeInput(value: string) {
    this.searchValue = value;
  }

  trackUniversities() {
    this.formEventService.hideUniversityForm.subscribe(() => {
     //  console.log('hide');
     this.getUniversities();
    })
  }

}
