import { Component, OnInit, ViewChild } from '@angular/core';

import { FacultyFormComponent } from '../../../components/forms/faculty-form/faculty-form.component';

import { PasswordValidator } from '../../../validators/password.validator';
import { FacultyService } from '../../../services/faculty/faculty.service';
import { Router } from '@angular/router';
import { BsModalComponent } from 'ng2-bs3-modal';
import { ModalService } from '../../../services/modal-service/modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-faculty-admin',
  templateUrl: './faculty-admin.component.html',
  styleUrls: ['./faculty-admin.component.css']
})
export class FacultyAdminComponent implements OnInit {
  bsModalRef: BsModalRef;
  public faculties;
  public selectedFaculties;
  displayedColumns= ['name', 'shortName', 'edit', 'delete'];
  search;

  constructor(public facultyService: FacultyService,
    private modalService: BsModalService,
    private formEventService: FormEventService,
    public router: Router,) {
  }

  getAll() {
    this.facultyService.getAll().subscribe(faculties => {
      console.log('facs - ', faculties);
      this.faculties = faculties;
      this.selectedFaculties = this.faculties
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
    this.selectedFaculties = this.faculties.filter((fac) => {
      let targ = fac.name.toUpperCase();
      if(targ.indexOf(value) != -1) {
        return true;
      } 
    })
  }

  trackFormFacultyHide() {
    this.formEventService.hideFacultyForm.subscribe(()=> {
      this.getAll();
    })
  }
 
  openFacultyForm(faculty?) {
    let edit;
    if(faculty) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      facultyEdit: faculty,

    };
    let modalOptions = {
      initialState: initialState,
      class:'faculty-form',
      ignoreBackdropClick: true

    }
    this.bsModalRef = this.modalService.show(FacultyFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  // openModal(id: string) {
  //   this.modalService.open(id);
  // }

  // closeModal(id: string) {
  //   this.modalService.close(id);
  // }

  addFaculty() {
    this.router.navigate(['new-faculty'])
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

  deleteFaculty(faculty) {
    this.facultyService.delete(faculty).subscribe(answer => {
      console.log('answer');
      this.getAll();
    })
  }

  ngOnInit() {
    this.getAll();
    this.trackFormFacultyHide();
    setTimeout(() => {
      // this.modalService.open('1');

    }, 5000);
  }

}
