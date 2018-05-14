import { Component, OnInit } from '@angular/core';
import { SpecializationService } from '../../../services/specialization/specialization.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SpecializationFormComponent } from '../../../components/forms/specialization-form/specialization-form.component';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-specialization-admin',
  templateUrl: './specialization-admin.component.html',
  styleUrls: ['./specialization-admin.component.css']
})
export class SpecializationAdminComponent implements OnInit {
  specializations;
  bsModalRef: BsModalRef;

  constructor(private specializationService: SpecializationService,
    private modalService: BsModalService, 
    public formEventService: FormEventService, 
    private router: Router) { }


  getAll() {
    this.specializationService.getAll().subscribe(specializations => {
        console.log('facs - ', specializations);
        this.specializations = specializations;
    })

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
    if(specialization) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      specializationEdit: specialization,

    };
    let modalOptions = {
      initialState: initialState,
      class:'specialization-form',
      ignoreBackdropClick: true

    }
    this.bsModalRef = this.modalService.show(SpecializationFormComponent, modalOptions);
    // this.bsModalRef.content.closeBtnName = 'Close';
  }

   deleteSpecialization(specialization) {
     this.specializationService.delete(specialization).subscribe(answer => {
       console.log('answer');
       this.getAll();
     })
   }

  ngOnInit() {
    this.getAll();
    this.trackSpecializations();
  }
}
