import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { QualificationService } from '../../../services/qualification/qualification.service';
import { QualificationFormComponent } from '../../../components/forms/qualification-form/qualification-form.component';
import { Router } from '@angular/router';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-qualification-admin',
  templateUrl: './qualification-admin.component.html',
  styleUrls: ['./qualification-admin.component.css']
})
export class QualificationAdminComponent implements OnInit {
  bsModalRef: BsModalRef;
  public qualifications;
  public selectedQualifications;
  displayedColumns= ['name', 'edit', 'delete']
  search;

  constructor(public qualificationService: QualificationService,
    private modalService: BsModalService,
    private formEventService: FormEventService,
    public router: Router,) {
  }

  getAll() {
    this.qualificationService.getAll().subscribe(qualifications => {
      console.log('Qualifications - ', qualifications);
      this.qualifications = qualifications;
      this.selectedQualifications = qualifications;
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
    this.selectedQualifications = this.qualifications.filter((fac) => {
      let targ = fac.name.toUpperCase();
      if(targ.indexOf(value) != -1) {
        return true;
      } 
    })
  }

  subscribeQualicationFormHide() {
    this.formEventService.hideQualificationForm.subscribe(()=> {
      this.getAll();
    })
  }

  
 
  openQualificationForm(qualification?) {
    let edit;
    if(qualification) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      qualificationEdit: qualification,

    };
    let modalOptions = {
      initialState: initialState,
      class:'qualification-form',
      ignoreBackdropClick: true

    }
    this.bsModalRef = this.modalService.show(QualificationFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  // openModal(id: string) {
  //   this.modalService.open(id);
  // }

  // closeModal(id: string) {
  //   this.modalService.close(id);
  // }

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

  deleteQualification(qualification) {
    this.qualificationService.delete(qualification).subscribe(answer => {
      console.log('answer');
      this.getAll();
    })
  }

  ngOnInit() {
    this.getAll();
    this.subscribeQualicationFormHide();
    setTimeout(() => {
      // this.modalService.open('1');

    }, 5000);
  }

}
