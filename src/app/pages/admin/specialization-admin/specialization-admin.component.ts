import { Component, OnInit } from '@angular/core';
import { SpecializationService } from '../../../services/specialization/specialization.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SpecializationFormComponent } from '../../../components/forms/specialization-form/specialization-form.component';
import { FormEventService } from '../../../services/events/form/form-event.service';
import {Specialization} from '../../../factory/specialization.factory';
import {UserWorker} from '../../../workers/UserWorker';
import {User} from '../../../factory/user.factory';
import {UserStorage} from '../../../storage/user/UserStorage';

@Component({
  selector: 'app-specialization-admin',
  templateUrl: './specialization-admin.component.html',
  styleUrls: ['./specialization-admin.component.css']
})
export class SpecializationAdminComponent implements OnInit {
  specializations;
  selectedSpecializations: Specialization[];
  bsModalRef: BsModalRef;
  displayedColumnsAdmin= ['name', 'faculty', 'code', 'qualification', 'edit', 'delete'];
  displayedColumns= ['name', 'faculty', 'code', 'qualification'];
  search;
  public user: User;
  // isAdmin: boolean;

  constructor(private specializationService: SpecializationService,
    private modalService: BsModalService,
    private userWorker: UserWorker,
    private userStorage: UserStorage,
    public formEventService: FormEventService,
    private router: Router) { }


  getAll() {
    this.specializationService.getAll().subscribe(specializations => {
        console.log('facs - ', specializations);
        this.specializations = specializations;
        this.selectedSpecializations = specializations;
    });

   }

   keyUp(event) {
     if (event.key === 'Escape') {
       this.search = '';
     }
     this.clickSearch();
   }
   clickSearch() {
     const value = this.search.toUpperCase();
     console.log()
     this.selectedSpecializations = this.specializations.filter((fac) => {
       const targ = fac.name.toUpperCase();
       if (targ.indexOf(value) !== -1) {
         return true;
       }
     });
   }

   trackSpecializations() {
     this.formEventService.hideSpecializationForm.subscribe(() => {
      //  console.log('hide');
        this.getAll();
     })
   }

   addSpecialization() {
     this.router.navigate(['new-specialization'])
   }

   goToEdit(specialization) {
     this.router.navigate(['edit-specialization', specialization.idSpecialization]);
   }
  openSpecializationForm(specialization?) {
    let edit;
    if (specialization) {
      edit = true;
    } else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      specializationEdit: specialization,

    };
    const modalOptions = {
      initialState: initialState,
      class: 'specialization-form',
      ignoreBackdropClick: true

    };
    this.bsModalRef = this.modalService.show(SpecializationFormComponent, modalOptions);
    // this.bsModalRef.content.closeBtnName = 'Close';
  }
  editSpecialization(specialization: Specialization) {
    this.specializationService.edit(specialization).subscribe(resSpecialization => {
    });
  }

   deleteSpecialization(specialization) {
     this.specializationService.delete(specialization).subscribe(answer => {
       console.log('answer');
       this.getAll();
     });
   }
   goToSpecializationPage(specialization: Specialization) {
    this.router.navigate(['specialization', specialization.idSpecialization]);
   }
  ngOnInit() {
    this.user = this.userStorage.getUser();
    // this.isAdmin = this.userWorker.hasAdminRole(this.user);
    this.getAll();
    this.trackSpecializations();
  }
}
